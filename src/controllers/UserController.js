const {errorResponse} = require("../helpers");
const {UserRepository} = require('../repositories/index');
const {UserService} = require('../services/index');

module.exports = class UserController {
    async login(req, res) {
        try {
            res.send(await UserService.login(req.body.email, req.body.password));
        } catch (ex) {
            res.status(400).send(errorResponse(ex))
        }
    }

    async register(req, res) {
        try {
            res.status(200).send(await UserService.register(req.body));
        }catch (ex) {
            res.status(400).send(errorResponse('Registratie mislukt'));
        }
    }

    async getProfile(req, res) {
        try {
            const objectId = req.params.id;
            const user = await UserRepository.read(objectId);
            return res.status(200).send(user);
        }catch (ex) {
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
