const {log} = require('../helpers');
const {UserRepository} = require('../repositories/index');
const {BadRequestError, InternalServerError} = require('../exceptions');
const {compare} = require('bcrypt');

class UserService {
    async show(id) {
        try {
            return (await UserRepository.read(id));
        }
        catch(ex) {
            log(ex);
            throw new BadRequestError('Account gegevens niet beschikbaar.');
        }
    }

    async register(data) {
        try {
            await UserRepository.create(data);
            return this.login(data.email, data.password);
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
                user: await UserRepository.read(user._id),  // Pass the user object without password & token fields.
                token
            };
        }
        catch (ex) {
            log(ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het inloggen.');
        }
    }

    /**
     * Update whole profile
     * @param id
     * @param makerProfile
     * @return {Promise<void>}
     */
    async update(id, profile) {
        try {
            await UserRepository.update(id, profile);
        }
        catch (ex) {
            log(ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het bijwerken van je profiel.');
        }
    }

    async updateSkills(id, skills) {
        try {
            await UserRepository.update(id, {'makerProfile.skills': skills});
        }
        catch (ex) {
            log(ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het bijwerken van je skills.');
        }
    }

    async updateMakerProfile(id, makerProfile) {
        try {
            await UserRepository.update(id, {  makerProfile });
        }
        catch (ex) {
            log(ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het bijwerken van je profiel.');
        }
    }

    async updateCompanyProfile(id, companyProfile) {
        try {
            await UserRepository.update(id, {  companyProfile });
        }
        catch (ex) {
            log(ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het bijwerken van je profiel.');
        }
    }

    async deleteTokens(id) {
        try {
           await UserRepository.update(id, {tokens: []});
        }
        catch (ex) {
            log(ex);
            throw new InternalServerError('Er is iets mis gegaan bij het verwijderen van je tokens.');
        }
    }

    async changePassword(id, oldPassword, newPassword) {
        if (oldPassword == newPassword)
            throw new BadRequestError('Kies een ander wachtwoord');

        // get user password
        const user = await UserRepository.readPassword(id);

        // compare stored password with old password
        if (!await compare(oldPassword, user.password))
            throw new BadRequestError('Onjuist wachtwoord!');

        try {
            UserRepository.update(id, {password: newPassword});
        }
        catch(ex) {
            throw new InternalServerError('Er is iets fout gegaan bij het updaten van je password');
        }
    }
}

module.exports = UserService;
