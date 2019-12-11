const {log} = require('../helpers');
const {UserRepository} = require('../repositories/index');
const {BadRequestError, InternalServerError} = require('../exceptions');

class UserService {
    async register(data) {
        try {
            const user = await UserRepository.create(data);
            user.password = null;
            return user;
        }
        catch(ex) {
            throw new BadRequestError('Account bestaat al!');
        }

    }

    async login(email, password) {
        const user = await UserRepository.findByCredentials(email, password);
        try {
            const token = await user.generateAuthToken();
            return {
                user,
                token
            };
        }
        catch (ex) {
            log(ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het inloggen');
        }
    }

}

module.exports = UserService;
