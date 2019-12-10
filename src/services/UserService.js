const {log} = require('../helpers');
const {UserRepository} = require('../repositories/index');

class UserService {
    async register(data) {
        try {
            const user = await UserRepository.create(data);
            user.password = null;
            return user;
        }
        catch(ex) {
            throw new Error('Account bestaat al!');
        }

    }

    async login(email, password) {
        try {
            const user = await UserRepository.findByCredentials(email, password);
            const token = await user.generateAuthToken();
            return {
                user,
                token
            };
        }
        catch (ex) {
            log(ex);
            throw new Error('Ongeldige gegevens');
        }
    }

}

module.exports = UserService;
