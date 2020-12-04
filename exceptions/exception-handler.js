const InternalErrorException = require("./internal-error-exception");

exports.retrieveException = function (err) {
    if (err instanceof InternalErrorException) {
        console.error(`INTERNAL ERROR "${err.message}": ${err.e.stack}`);
        return err.message;
    } else {
        console.error(`Uncaught exception occurred: ${err.stack}`);
        return "An unspecified error occurred while completing your request.";
    }
}