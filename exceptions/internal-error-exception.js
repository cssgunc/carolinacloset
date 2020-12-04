module.exports = class InternalErrorException extends Error {
    constructor(message, e) {
        super(message);
        this.name = this.constructor.name;
        this.e = e;
    }
}