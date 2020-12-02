const { v4: uuidv4 } = require("uuid");
const BadRequestException = require("../exceptions/bad-request-exception");
const InternalErrorException = require("../exceptions/internal-error-exception");
const CarolinaClosetException = require("../exceptions/carolina-closet-exception");

module.exports = (app, Item, Order, Transaction) => {
  app.get('/preorders', async (req, res) => {
    try {
      let preorders = await Transaction.findAll({
        where: {
          volunteer_id: "PREORDER",
          status: "pending"
        }
      });
      res.send(preorders);
    } catch (e) {
      throw new InternalErrorException("A problem occurred when retrieving all preorders", e);
    }
  });

  app.get('/preorder/:id', async (req, res) => {
    try {
      let preorder = await Transaction.findOne({ where: { id: req.params.id } });
      if (!preorder || preorder.volunteer_id !== 'PREORDER') {
        throw new BadRequestException("The transaction could not be retrieved.");
      }
      res.send(preorder);
    } catch (e) {
      if (e instanceof CarolinaClosetException) {
        throw e;
      }
      throw new InternalErrorException("A problem occurred when retrieving a preorder", e);
    }
  });

  app.post('/preorder', async (req, res) => {
    let processQueue = {};
    let completedTransactions = [];

    const newOrderId = uuidv4();
    await Order.create({ id: newOrderId });

    // Adds item to process queue, combines duplicate items
    req.body.cart.forEach((item) => {
      processQueue[item.id] = processQueue[item.id] === undefined ? item.quantity : currQuantity + item.quantity;
    });

    try {
      // Creates transactions for each item in the process queue
      for(id in processQueue) {
        quantity = processQueue[id];

        // Skips if quantity is zero or less
        if (quantity <= 0) return;
        console.log(id);
        let item = await Item.findOne({ where: { id: id } });

        if (!item) {
          throw new BadRequestException("The item doesn't exist in our inventory");
        }

        console.log(item);

        // Throws an error if there aren't enough in stock
        if (quantity > 0 && item.count < quantity) {
          throw new BadRequestException("The amount requested for " + item.name + " is " + (quantity - item.count) + " more than the quantity in the system");
        }

        let transaction = await Transaction.build({
          id: '',
          item_id: id,
          item_name: item.name,
          count: -quantity,
          onyen: req.body.onyen,
          order_id: newOrderId,
          volunteer_id: "PREORDER",
          status: 'pending'
        });

        await transaction.save();

        // changes item count, but if it fails, roll back this transaction
        try {
          await item.increment('count', { by: -quantity });
        } catch (e) {
          await this.deletePreorder(transaction.id, 'PREORDER');
          throw e;
        }

        delete processQueue[id];
        completedTransactions.push(transaction);
      }
      res.send();
    } catch (e) {
      console.error(e);
      // If one transaction fails, we delete each of them and revert the counts
      completedTransactions.forEach(async (transaction) => {
        this.deletePreorder(transaction.id);
        let item = await Item.findOne({ where: { id: transaction.item_id } });
        await item.increment('count', { by: -(transaction.count) });
      });

      await Order.destroy({ where: { id: newOrderId } });

      throw e;
    }
  });

  app.put('/preorder/complete/:id', async (req, res) => {
    try {
      let preorder = await this.getPreorder(req.params.id);
      preorder.volunteer_id = req.body.volunteerId;
      preorder.status = "complete";
      preorder.save();
    } catch (e) {
      throw new InternalErrorException("A problem occurred when completing preorder", e);
    }
  });

  app.put('/preorder/cancel/:id', async (req, res) => {
    try {
      let preorder = await this.getPreorder(req.params.id);
      preorder.volunteer_id = req.body.volunteerId;
      preorder.status = "cancelled";
      preorder.save();
      let itemId = preorder.item_id;
      await this.putbackCancelledItems(itemId, -preorder.count);
    } catch (e) {
      throw new InternalErrorException("A problem occurred when cancelling preorder", e);
    }
  });

  app.put('/preorder/putBack/:id', async (req, res) => {
    try {
      let item = await Item.findOne({ where: { id: req.params.id } });
      item.increment('count', { by: count });
    } catch (e) {
      throw e;
    }
  });

  app.delete('/preorder/:id', async (req, res) => {
    try {
      await Transaction.destroy({
        where: {
          id: req.params.id
        }
      });
    } catch (e) {
      throw new InternalErrorException("A problem occurred when deleting preorder", e);
    }
  });
}