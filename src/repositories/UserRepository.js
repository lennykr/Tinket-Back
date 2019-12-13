const User = require('../models/User');
const BaseRepository = require('./BaseRepository');
const bcrypt = require('bcrypt');
const {BadRequestError} = require('../exceptions');

class UserRepository extends BaseRepository {
    constructor() {super(User);}

    async readWithSkills(objectId) {
        const document = await this.model.findById(objectId)
            .populate({ path: 'makerProfile.skills', model: 'Skill'});
        if (document == null)
            throw new Error(`Document with ObjectId ${objectId} not found`);
        return document;
    }

    async readPassword(id) {
        return await User.findOne({_id: id})
            .select('password');
    }

    async findByCredentials(email, password) {
        const user = await User.findOne({email}).select(['+password', '+tokens']);

        if (user == null || !await bcrypt.compare(password, user.password))
            throw new BadRequestError('Email of wachtwoord onjuist!');

        return user;
    }

    async addReview(objectId, review) {
        const result = await this.model.update({ _id: objectId}, { $push: {reviews: review} });
        return result.n > 0;
    }

    async deleteReview(userId, reviewId){
        const review = await this.model.find({_id: userId});
        console.log(review);
        console.log(review.reviews);
        //const result = await this.model.update({ _id: userId}, { $pull: {reviews: reviewId} });
        //return result.n > 0;
    }

    async readReviews(id){
        const reviews = await this.model.findById(id);
        return reviews.reviews;
    }
}

module.exports = UserRepository;
