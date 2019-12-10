const {UserRepository} = require('../repositories/index');

class UserService {
    async register(data) {
        const user = await UserRepository.create(data);
        user.password = null;
        return user;
    }

    async login(email, password) {
        try {
            const user = await UserRepository.findByCredentials(email, password);
            return await user.generateAuthToken();
        }
        catch (ex) {
            throw new Error('Ongeldige gegevens');
        }
    }

}

module.exports = UserService;
