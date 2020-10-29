const Sequelize = require("sequelize");
const BadRequestException = require("../exceptions/bad-request-exception");
const InternalErrorException = require("../exceptions/internal-error-exception");
const CarolinaClosetException = require("../exceptions/carolina-closet-exception");
const csvParser = require("csv-parse");

module.exports = (app, User) => {
  app.get('/users', (req, res) => {
    try {
      let users = await User.findAll();
      return users;
    } catch (e) {
      throw new InternalErrorException("A problem occurred when retrieving all users", e);
    }
  });

  app.get('/user/:onyen', (req, res) => {
    try {
      let user = await User.findOne({
        where: { onyen: req.params.onyen }
      });
      return user;
    } catch (e) {
      throw new InternalErrorException("A problem occurred when retrieving user", e);
    }
  });

  app.post('/user', (req, res) => {
    try {
      // If user already exists, do nothing
      if (await User.count({ where: { onyen: req.body.onyen } }) > 0) {
          return;
      }
      let user = await User.build({
          onyen: req.body.onyen,
          type: req.body.type,
          pid: req.body.pid,
          email: req.body.email
      });
      await user.save();
      return user;
    } catch (e) {
      /*if (e instanceof Sequelize.ValidationError) {
        let errorMessage = "The following values are invalid:";
        e.errors.forEach((error) => {
          errorMessage += `\n${error.path}: ${error.message}`;
        });
        throw new BadRequestException(errorMessage);
      }*/
      throw new InternalErrorException("A problem occurred when saving the user", e);
    }
  });

  api.post('/users/upsert', (req, res) => {
    try {
      let newInfo = {
        onyen: req.body.onyen,
      };
      newInfo.type = req.body.type ? type : 'user';
      if (req.body.pid) newInfo.pid = req.body.pid;
      if (req.body.email) newInfo.email = req.body.email;

      let user = await User.upsert(newInfo, {
        returning: true
      });
      return user;
    } catch (e) {
      /*if (e instanceof Sequelize.ValidationError) {
        let errorMessage = "The following values are invalid:";
        e.errors.forEach((error) => {
            errorMessage += `\n${error.path}: ${error.message}`;
        });
        throw new BadRequestException(errorMessage);
      }*/
      throw new InternalErrorException("A problem occurred when updating user info", e);
    }
  });

  app.put('/users', (req, res) => {
    try {
      let newInfo = {};
      if (req.body.type) newInfo.type = req.body.type;
      if (req.body.pid) newInfo.pid = req.body.pid;
      if (req.body.email) newInfo.email = req.body.email;

      let user = await User.update(
        newInfo,
        { where: { onyen: req.body.onyen } }
      );

      return user;
    } catch (e) {
      /*if (e instanceof Sequelize.ValidationError) {
        let errorMessage = "The following values are invalid:";
        e.errors.forEach((error) => {
            errorMessage += `\n${error.path}: ${error.message}`;
        });
        throw new BadRequestException(errorMessage);
      }*/
      throw new InternalErrorException("A problem occurred when editing the user", e);
    }
  });

  app.put('/users/:firstItemDate', (req, res) => {
    try {
      let user = await User.update(
        {
          firstItemDate: req.params.firstItemDate
        },
        {
          where: { onyen: onyen }
        },
      );

      return user;
    } catch (e) {
      /*if (e instanceof Sequelize.ValidationError) {
        let errorMessage = "The following values are invalid:";
        e.errors.forEach((error) => {
          errorMessage += `\n${error.path}: ${error.message}`;
        });
        throw new BadRequestException(errorMessage);
      }*/
      throw new InternalErrorException("A problem occurred when updating user's first item date", e);
    }
  });

  app.delete('/user/:onyen', (req, res) => {
    if (onyen !== "PREORDER") {
      try {
        User.destroy(
            { where: { onyen: req.params.onyen } }
        );
      } catch (e) {
        if (e instanceof CarolinaClosetException) {
          throw e;
        }

        throw new InternalErrorException("A problem occurred when deleting the user", e);
      }
    }
  });

  app.delete('/users', (req, res) => {
    try {
      await User.destroy({
        where: {},
        truncate: false
      });

      await this.createUser("PREORDER", "admin", 0, "preorder@admin.com");
      if(process.env.DEFAULT_ADMIN) {
        await this.createUser(process.env.DEFAULT_ADMIN, "admin", 1, "admin@admin.com");
      }
    } catch (e) {
      if (e instanceof CarolinaClosetException) {
        throw e;
      }

      throw e;
    }
  });

}