const User = require('../models/User');

module.exports = class UserController {
    login(req, res) {
        return res.send('test');
    }

    async register(req, res) {
        try {
            const user = new User(req.body);
            await user.save();
            res.send('blajh');
        }catch (ex) {
            res.status(400).send(ex);
        }
    }
};
