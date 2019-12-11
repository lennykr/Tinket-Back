const {log} = require('../helpers');
const {UserRepository} = require('../repositories/index');
const {BadRequestError, InternalServerError} = require('../exceptions');

class UserService {
    async show(id) {
        try {
            return (await UserRepository.read(id));
        }
        catch(ex) {
            log(ex);
            throw new BadRequestError('Account bestaat al!');
        }
    }

    async register(data) {
        try {
            return (await UserRepository.create(data));
        }
        catch(ex) {
            log(ex);
            throw new BadRequestError('Account bestaat al!');
        }
    }

    async login(email, password) {
        const user = await UserRepository.findByCredentials(email, password);
        try {
            const token = await user.generateAuthToken();
            return {
                user: await this.show(user._id),  // Pass the user object without password & token fields.
                token
            };
        }
        catch (ex) {
            log(ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het inloggen.');
        }
    }
}

module.exports = UserService;
