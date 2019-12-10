const promiseResponseHelper = (req, res, promise) => {
    promise
        .then((data) => sendSuccess(req, res, data))
        .catch((error) => sendError(req, res, error))
};

const sendSuccess = (req, res, data) => {
    res.send(data);
};

const sendError = (req, res, error) => {
    res.status(500).send({
        message: error.message
    });
};

const log = (message) => {
    if(process.env.APP_ENV !== "prod") console.error(message);
};

module.exports = {
    promiseResponseHelper,
    sendSuccess,
    log
};
