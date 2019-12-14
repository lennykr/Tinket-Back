const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_SECRET);

        try{
            const user = await User.findOne({ _id: data._id, 'tokens.token': token });

            if (!user)
                res.status(401).send({ message: 'Invalid token.' });

            user.isAdmin = () => !!req.user.isAdmin;
            req.user = user;
            req.token = token;

            next();
        }
        catch (ex) {
            throw ex;
        }

    } catch (error) {
        res.status(401).send({ message: 'Authorization required.' });
    }
};
