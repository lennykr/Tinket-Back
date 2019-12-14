const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {log} = require('../helpers');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_SECRET);

        try{
            const user = await User.findOne({ _id: data._id, 'tokens.token': token });

            if (!user)
                res.status(401).send({ message: 'Invalid token.' });

            user.isAdmin   =  () => !!req.user.isAdmin;
            user.isCompany =  () => !!req.user.companyProfile;
            user.isMaker   =  () => !!req.user.makerProfile;

            req.user = user;
            req.token = token;

            next();
        }
        catch (ex) {
            throw ex;
        }

    } catch (error) {
        log(error);
        res.status(401).send({ message: 'Authorization required.' });
    }
};
