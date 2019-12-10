const {log, errorResponse, promiseResponseHelper} = require('../helpers');
const {UserRepository} = require('../repositories/index');
const {UserService} = require('../services/index');

module.exports = class UserController {
    login(req, res) {
        promiseResponseHelper(req, res, UserService.login(req.body.email, req.body.password));
    }

    async register(req, res) {
        promiseResponseHelper(req, res, UserService.register({
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.firstname
        }));
    }

    async getProfile(req, res) {
        try {
            const objectId = req.params.id;
            const user = await UserRepository.read(objectId);
            return res.status(200).send(user);
        }catch (ex) {
            log(ex);
            res.status(400).send(errorResponse('User niet gevonden'));
        }
    }

    async delete(req, res) {
        // TODO
    }

    async update(req, res) {
        // TODO
    }
};
