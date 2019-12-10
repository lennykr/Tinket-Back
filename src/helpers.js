module.exports = {
    log(message) {
        if(process.env.APP_ENV !== "prod") console.error(message);
    },

    errorResponse: (message) => { message },
};
