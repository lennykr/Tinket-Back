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
                token
            };
        }
        catch (ex) {
            log(ex);
            throw new Error('Ongeldige gegevens');
        }
    }

    async updateProfile(id, userProfile){
        try{
            const userProfile = await UserRepository.update(id, userProfile);
        }
        catch (ex) {
            log (ex);
            throw new Error('Update mislukt');
        }
    }

}

module.exports = UserService;
