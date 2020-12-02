const CarolinaClosetException = require("./carolina-closet-exception");

module.exports = class UnauthorizedRequestException extends CarolinaClosetException {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}