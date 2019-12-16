const {UserRepository} = require('../repositories/index');
const {BadRequestError} = require('../exceptions');
const {compare} = require('bcrypt');

class UserService {
    async show(id) {
        return await UserRepository.readWithSkills(id);
    }

    async register(data) {
        try {
            await UserRepository.create(data);
        }
        catch(ex) {
            if (ex.code == 11000)
                throw new BadRequestError('Email bestaal al!');
            else
                throw ex;
        }
        return this.login(data.email, data.password);
    }

    async login(email, password) {
        const user = await UserRepository.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        return {
            user: await UserRepository.read(user._id),  // Pass the user object without password & token fields.
            token
        };
    }

    /**
     * Update whole profile
     * @param id
     * @param makerProfile
     * @return {Promise<void>}
     */
    async update(id, user, profile) {
        console.log('iscompany ' + user.isCompany());
        if (user.isCompany() && profile.makerProfile)
            throw new BadRequestError('Je hebt een maker account nodig om deze actie uit te voeren!');

        if (user.isMaker() && profile.companyProfile)
            throw new BadRequestError('Je hebt een bedrijfsaccount nodig om deze actie uit te voeren!');

        await UserRepository.update(id, profile);
    }

    async updateSkills(id, skills) {
        await UserRepository.update(id, {'makerProfile.skills': skills});
    }

    async updateMakerProfile(id, user, makerProfile) {
        if (!user.isAdmin  && user.isCompany())
            throw new BadRequestError('Je hebt een maker account nodig om deze actie uit te voeren!');

        await UserRepository.update(id, {  makerProfile });
    }

    async updateCompanyProfile(id, user, companyProfile) {
        if (!user.isAdmin && user.isMaker())
            throw new BadRequestError('Je hebt een maker account nodig om deze actie uit te voeren!');

        await UserRepository.update(id, { companyProfile });
    }

    async readAllReviews(){
        return await UserRepository.readAllReviews();
    }

    async readReviews(id){
        return await UserRepository.readReviews(id);
    }

    async addReview(id, review){
        await UserRepository.add(id, review);
    }

    async addReviewFlag(userId, reviewId){
        await UserRepository.addReviewFlag(userId, reviewId);
    }

    async deleteReviewFlag(userId, reviewId){
        await UserRepository.deleteReviewFlag(userId, reviewId);
    }

    async deleteReview(userId, reviewId){
        await UserRepository.deleteReview(userId, reviewId);
    }
    async deleteTokens(id) {
        await UserRepository.update(id, {tokens: []});
    }

    async deleteUser(id) {
        await UserRepository.delete({_id: id});
    }

    async changePassword(id, oldPassword, newPassword) {
        if (oldPassword == newPassword)
            throw new BadRequestError('Kies een ander wachtwoord');

        // get user password
        const user = await UserRepository.readPassword(id);

        // compare stored password with old password
        if (!await compare(oldPassword, user.password))
            throw new BadRequestError('Onjuist wachtwoord!');

        UserRepository.update(id, {password: newPassword});
    }

    /**
     * @param exclAdmins boolean whether or not to exclude admins from the resultset
     * @return {Promise<void>}
     */
    async getAllUsers(exclAdmins = true) {
        const filter = exclAdmins ? [{isAdmin: null}, {isAdmin: false}] : [{}];
        return await UserRepository.readAll({$or: filter});
    }
}

module.exports = UserService;
