const UnauthorizedRequestException = require("./unauthorized-request-exception"),
    BadRequestException = require("./bad-request-exception"),
    InternalErrorException = require("./internal-error-exception");

exports.retrieveException = function (err) {
    if (err instanceof InternalErrorException) {
        console.error(`INTERNAL ERROR "${err.message}": ${err.e.stack}`);
        return err.message;
    } else if (err instanceof BadRequestException) {
        console.error(`BAD REQUEST "${err.message}": ${err.e.stack}`);
        return err.message;
    } else if (err instanceof InternalErrorException) {
        console.error(`UNAUTHORIZED REQUEST "${err.message}": ${err.e.stack}`);
        return err.message;
    } else {
        console.error(`Uncaught exception occurred: ${err.stack}`);
        return "An unspecified error occurred while completing your request.";
    }
}