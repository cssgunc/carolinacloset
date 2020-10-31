const Sequelize = require("sequelize");
const InternalErrorException = require("../exceptions/internal-error-exception");
const CarolinaClosetException = require("../exceptions/carolina-closet-exception");

module.exports = (app, Transaction) => {
  app.get('/transactions', (req, res) => {
    try {
      let trans = await Transaction.findAll();
      res.send(trans);
    } catch (e) {
      if(e instanceof CarolinaClosetException) {
        throw e;
      }
      throw new InternalErrorException("A problem occurred when retrieving the transaction", e);
    }
  });

  app.get('/transaction/removal/:onyen', (req, res) => {
    try {
      let trans = await Transaction.findAll({
        where: {
          onyen: onyen,
          count: {[Sequelize.Op.lt]: 0}
        }
      });
      res.send(trans);
    } catch(e) {
      if (e instanceof CarolinaClosetException) {
        throw e;
      }      
      throw new InternalErrorException("A problem occurred when retrieving the transaction", e);
    }
  });

  app.delete('/transactions', (req, res) => {
    try {
      await Transaction.destroy({
        where: {},
        truncate: true
      });
    } catch(e) {
      if (e instanceof CarolinaClosetException) {
        throw e;
      }
      throw new InternalErrorException("A problem occurred when deleting the transactions", e);
    }
  });
}
