const {log} = require('../helpers');
const {UserRepository} = require('../repositories/index');
const {BadRequestError, InternalServerError} = require('../exceptions');
const {compare} = require('bcrypt');

class UserService {
    async show(id) {
        try {
            return (await UserRepository.readWithSkills(id));
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
    async update(id, user, profile) {
        if (user.companyProfile && profile.makerProfile)
            throw new BadRequestError('Je hebt een maker account nodig om deze actie uit te voeren!');

        if (user.makerProfile && profile.companyProfile)
            throw new BadRequestError('Je hebt een bedrijfsaccount nodig om deze actie uit te voeren!');

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

    async updateMakerProfile(id, user, makerProfile) {
        if (!user.isAdmin  && user.companyProfile != null)
            throw new BadRequestError('Je hebt een maker account nodig om deze actie uit te voeren!');

        try {
            await UserRepository.update(id, {  makerProfile });
        }
        catch (ex) {
            log(ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het bijwerken van je profiel.');
        }
    }

    async updateCompanyProfile(id, user, companyProfile) {
        if (!user.isAdmin && user.makerProfile != null)
            throw new BadRequestError('Je hebt een maker account nodig om deze actie uit te voeren!');

        try {
            await UserRepository.update(id, {  companyProfile });
        }
        catch (ex) {
            log(ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het bijwerken van je profiel.');
        }
    }

    async readAllReviews(){
        try{
            return await UserRepository.readAllReviews();
        }
        catch (ex) {
            log (ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het ophalen van alle reviews.');
        }
    }

    async readReviews(id){
        try{
            return await UserRepository.readReviews(id);
        }
        catch (ex){
            log (ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het ophalen van de reviews.');
        }
    }

    async addReview(id, review){
        try{
            await UserRepository.addReview(id, review);
        }
        catch (ex){
            log (ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het toevoegen van een review.');
        }
    }

    async addReviewFlag(userId, reviewId){
        try{
            await UserRepository.addReviewFlag(userId, reviewId);
        }
        catch (ex) {
            log (ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het flaggen van een review.');
        }
        
    }

    async deleteReviewFlag(userId, reviewId){
        try{
            await UserRepository.deleteReviewFlag(userId, reviewId);
        }
        catch (ex) {
            log (ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het flaggen van een review.');
        }
    }

    async deleteReview(userId, reviewId){
        try{
            await UserRepository.deleteReview(userId, reviewId);
        }
        catch (ex){
            log (ex);
            throw new InternalServerError('Er is iets mis gegaan tijdens het verwijderen van een review.');
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

    async deleteUser(id) {
        try {
            await UserRepository.delete({_id: id});
        }
        catch (ex) {
            log(ex);
            throw new InternalServerError('Er is iets mis gegaan bij het verwijderen van deze user.');
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

    /**
     * @param exclAdmins boolean whether or not to exclude admins from the resultset
     * @return {Promise<void>}
     */
    async getAllUsers(exclAdmins = true) {
        try{
            const filter = exclAdmins ? [{isAdmin: null}, {isAdmin: false}] : [{}];
            return await UserRepository.readAll({$or: filter});
        }
        catch (ex){
            log (ex);
            throw new InternalServerError('Er is iets mis gegaan bij het ophalen van alle users.');
        }
    }
}

module.exports = UserService;
