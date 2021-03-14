const supertest = require('supertest'),
    app = require('../../app'),
    dbUtil = require('../../db/db-util.js'),
    ItemService = require('../../services/item-service'),
    OrderService = require('../../services/order-service'),
    testUtil = require('../util/test-util');

require('dotenv').config();

describe('Order Routes - Order Management Workflow', () => {
    before(async () => {
        await ItemService.deleteAllItems();
        await dbUtil.preTestSetup();
        const item = await ItemService.createItem('test_pants', 'pants', 'male', null, null, 'black', 5, { waistSize: "32", pantsLength: "30" });
        await OrderService.createOrder([{ id: item.get('id'), quantity: 1 }], testUtil.userAuthHeaders.uid);
        await OrderService.createOrder([{ id: item.get('id'), quantity: 1 }], testUtil.userAuthHeaders.uid);
    });

    describe('GET /orders - get all orders', () => {
        it('expect success HTTP 200 status', (done) => {
            supertest(app).get('/orders')
                .set(testUtil.adminAuthHeaders)
                .expect(200, done);
        });
    });

    describe('POST /orders/complete - complete an order', () => {
        it('expect success HTTP 200 status', (done) => {
            const requestBody = {
                id: 1
            };
            supertest(app).post('/orders/complete')
                .set(testUtil.adminAuthHeaders)
                .send(requestBody)
                .expect(200, done);
        });
    });

    describe('POST /orders/cancel - cancel an order', () => {
        it('expect success HTTP 200 status', (done) => {
            const requestBody = {
                id: 2
            };
            supertest(app).post('/orders/cancel')
                .set(testUtil.adminAuthHeaders)
                .send(requestBody)
                .expect(200, done);
        });
    });
});