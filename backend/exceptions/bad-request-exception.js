const CarolinaClosetException = require("./carolina-closet-exception");

module.exports = class BadRequestException extends CarolinaClosetException {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}