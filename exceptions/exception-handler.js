const CarolinaClosetException = require("./carolina-closet-exception"),
    InternalErrorException = require("./internal-error-exception");

exports.retrieveException = function (err) {
    if (err instanceof CarolinaClosetException) {
        if (err instanceof InternalErrorException) {
            console.error(`INTERNAL ERROR "${err.message}": ${err.e.stack}`);
        }
        return err.message;
    } else {
        //log uncaught exception and throw internal exception
        console.error(`Uncaught exception occurred: ${err.stack}`);
        return "An unspecified error occurred while completing your request.";
    }
}