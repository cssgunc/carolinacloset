const should = require('should');

const commonHeaders = {
};

const adminAuthHeaders = {
    uid: process.env.DEFAULT_ADMIN
};
const userAuthHeaders = {
    uid: "userOnyen"
};

// Checks response body for a match to the fail message on invalid CSV import
let matchResponseText = (res, pattern) => {
    res.text.should.match(pattern);
}

exports.commonHeaders = commonHeaders;
exports.adminAuthHeaders = adminAuthHeaders;
exports.userAuthHeaders = userAuthHeaders;
exports.matchResponseText = matchResponseText;
exports.alertDanger = /alert-danger/;