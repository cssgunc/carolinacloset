const CarolinaClosetException = require("./carolina-closet-exception");

module.exports = class InternalErrorException extends CarolinaClosetException {
    constructor(message, e) {
        super(message);
        this.name = this.constructor.name;
        this.e = e;
    }
}