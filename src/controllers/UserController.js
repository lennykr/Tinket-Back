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

    async updateProfile(req, res) {
        try {
            req.user.userProfile = {
                displayName: req.body.displayName,
                bio: req.body.bio,
                experience: req.body.experience
            }
            const userProfile = req.user.userProfile;
            promiseResponseHelper(req, res, UserService.updateProfile(req.user._id, {
                displayName: userProfile.displayName,
                bio: userProfile.bio,
                experience: userProfile.experience
            }));
        }
        catch (ex) {
            console.error(ex);
            res.status(400).send('Update mislukt');
        }
    }
};
