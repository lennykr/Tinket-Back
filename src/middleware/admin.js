module.exports = (req, res, next) => {
    // ('!!' -> converts the value to false if it's null)
    if (!!req.user.isAdmin === false)
        res.status(403).send({ message: 'Privileges required.' });

    next();
};
