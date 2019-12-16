const promiseResponseHelper = (req, res, promise) => {
    promise
        .then((data) => sendSuccess(req, res, data))
        .catch((error) => sendError(req, res, error))
};

const sendSuccess = (req, res, data) => {
    res.send(data);
};

const sendError = (req, res, error) => {
    const statusCode = error.statusCode || 500;

    if (process.env.APP_ENV !== undefined && process.env.APP_ENV.startsWith('prod'))
    {
        res.status(statusCode).send({message: statusCode == 500 ? 'Er is iets mis gegeaan' : error.message});
        return;
    }

    console.error(error);
    res.status(statusCode).send({
        message: error.message,
        stack: error.stack
    });
};

module.exports = {
    promiseResponseHelper
};
