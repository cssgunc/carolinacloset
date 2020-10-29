const { v4: uuidv4 } = require("uuid");
const Sequelize = require("sequelize");
const BadRequestException = require("../exceptions/bad-request-exception");
const InternalErrorException = require("../exceptions/internal-error-exception");
const CarolinaClosetException = require("../exceptions/carolina-closet-exception");
const exceptionHandler = require("../exceptions/exception-handler");
const csvParser = require("csv-parse");

module.exports = (app, Item) => {
  app.get('/items', (req, res) => {
    try {
      let items = await db.findAll();
      return items;
    } catch (e) {
      throw new InternalErrorException("A problem occurred when retrieving items",e);
    }
  });

  app.get('/items/:id', (req, res) => {
    try {
      let item = await findOne({ where: { id: req.params.id } });
      if (!item) {
        throw new BadRequestException("The item could not be retrieved.");
      }
      return item;
    } catch (e) {
      if(e instanceof CarolinaClosetException) {
        throw e;
      }
      throw new InternalErrorException("A problem occurred when retrieving the item",e);
    }
  });

  app.get('/items/:name', (req, res) => {
    try {
      desc = req.body.desc ? desc : '';
      let item = await Item.findOne({ where: { name: req.params.name, description: desc }});
      return item;
    } catch (e) {
      throw e;
    }
  });

  app.post('/item', (req, res) => {
    try {
      let item = await Item.create({
          id: '',
          name: req.body.name,
          description: req.body.description ? req.body.description : '',
          count: req.body.count
      });
      return item;
    } catch (e) {
      /*if (e instanceof Sequelize.ValidationError) {
        let errorMessage = "The following values are invalid:";
        e.errors.forEach((error) => {
            errorMessage += `\n${error.path}: ${error.message}`;
        });
        throw new BadRequestException(errorMessage);
      }*/
      throw new InternalErrorException("A problem occurred when saving the item",e);
    }
  });

  app.put('/item', (req, res) => {
    try {
      let item = await Item.update({
        name: req.body.name,
        barcode: req.body.barcode,
        description: req.body.description ? req.body.description : '',
      }, {
        where: { id, id },
        fields: ['name', 'barcode', 'description'],
        returning: true
      });
      return item;
    } catch (e) {
      /*if (e instanceof Sequelize.ValidationError) {
        let errorMessage = "The following values are invalid:";
        e.errors.forEach((error) => {
            errorMessage += `\n${error.path}: ${error.message}`;
        });
        throw new BadRequestException(errorMessage);
      }*/
      throw new InternalErrorException("A problem occurred when saving the item",e);
    }
  });

  app.delete('/items', (req, res) => {
    try {
      await Item.destroy({
        where: {},
        truncate: false
      });
    } catch(e) {
      if (e.name === "SequelizeForeignKeyConstraintError") {
        throw e;
      }

      if (e instanceof CarolinaClosetException) {
        throw e;
      }
      
      throw new InternalErrorException("A problem occurred when deleting the items", e);
    }
  });

  app.delete('/items/outOfStock', (req, res) => {
    try {
      await Item.destroy({
        where: {
          count: {[Sequelize.Op.lte]: 0}
        },
        truncate: false
      });
    } catch(e) {
      if(e instanceof CarolinaClosetException) {
        throw e;
      }
      
      throw new InternalErrorException("A problem occurred when deleting the out of stock items", e);
    }
  });
}