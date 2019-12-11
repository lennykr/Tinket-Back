module.exports = async (req, res, next) => {
    // only allow companies to access this endpoint
    if (req.user.companyProfile == null)
        res.status(403).send({message: 'Invalid profile type.'});

    next();
};
