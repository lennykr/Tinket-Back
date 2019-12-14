module.exports = (req, res, next) => {
    // block the request if the user isn't an admin & is trying to access someone else's profile
    if (!req.user.isAdmin() && req.params.id != req.user._id) {
        res.status(403).send({ message: 'Privileges required.'});
        return;
    }

    next();
};
