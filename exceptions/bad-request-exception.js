module.exports = class BadRequestException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}