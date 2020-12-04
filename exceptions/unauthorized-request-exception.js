module.exports = class UnauthorizedRequestException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}