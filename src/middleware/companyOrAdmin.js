const company = require('./company');

module.exports = async (req, res, next) => {
    if (req.user.isAdmin()) {
        next()
    }else {
        company(req, res, next);
    }
};
