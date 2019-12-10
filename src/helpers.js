module.exports = {
    promiseResponseHelper(caller, parameters) {
        try {
            return caller(...parameters);
        } catch (ex) {
            log(ex);
            res.status(400).send(errorResponse(ex))
        }
    },

    log(message) {
        if(process.env.APP_ENV !== "prod") console.error(message);
    },

    errorResponse: (message) => ({ message }),
};
