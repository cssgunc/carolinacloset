const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/server');
const fileUpload = require('express-fileupload');
const userIsAuthenticated = require('./controllers/util/auth').userIsAuthenticated;
const userHasInfo = require('./controllers/util/auth').userHasInfo;
const userIsBasicUser = require('./controllers/util/auth').userIsBasicUser;
const apiTransaction = require('./api/transaction');
const apiPreorder = require('./api/preorder');
const apiUser = require('./api/user');
const apiItem = require('./api/item');
const db = require('./db/sequelize');

// API
apiTransaction(app, db.transactions);
apiPreorder(app, db.items, db.orders, db.transactions);
apiUser(app, db.users);
apiItem(app, db.items);

if (process.env.NODE_ENV === 'prod') {
    app.set('trust proxy', 1);
}

// Set up server parsing and logging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (config) {
    app.use(morgan(config.logging));
}

// Registers static asset directory
app.use('/static', express.static('static'));

app.use(fileUpload());

// Registers authentication middleware on all routes
app.use([userIsAuthenticated, userHasInfo]);

app.get('/', [userIsBasicUser], async function (req, res) {
    res.render('index.ejs', { onyen: res.locals.onyen, userType: res.locals.userType });
});

module.exports = app;