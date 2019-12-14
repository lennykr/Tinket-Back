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
        const result = await this.model.update({ _id: objectId}, { $push: {reviews: review}});
        return result.n > 0;
    }

    async deleteReview(userId, reviewId){
        const user = await this.model.findOne({ _id: userId});
        for(let review in user.reviews){
            if(user.reviews[review]._id == reviewId){
                user.reviews[review].deletedAt = Date.now();
            }
        }
        const result = await this.model.updateOne({ _id: userId}, {$set: user});
        return result.n > 0;
    }

    async addReviewFlag(userId, reviewId){
        const user = await this.model.findOne({ _id: userId});
        for(let review in user.reviews){
            if(user.reviews[review]._id == reviewId)
            user.reviews[review].flaggedAt = Date.now();
        }
        const result = await this.model.updateOne({ _id: userId}, {$set: user});
        return result.n > 0;
    }

    async deleteReviewFlag(userId, reviewId){
        const user = await this.model.findOne({ _id: userId});
        for(let review in user.reviews){
            if(user.reviews[review]._id == reviewId){
                user.reviews[review].flaggedAt = null;
                user.reviews[review].flagSolvedAt = Date.now();
            }
        }
        const result = await this.model.updateOne({ _id: userId}, {$set: user});
        return result.n > 0;
    }

    async readReviews(id){
        const user = await this.model.findById(id)
            .populate({ path: 'reviews.reviewedBy', model: 'User'});
        return user.reviews;
    }

    async readAllReviews(){
        const users = await this.model.find();
        const reviews = [];
        for(let user in users){
            for(let review in users[user].reviews){
                if(users[user].reviews[review].deletedAt == null)
                    reviews.push(users[user].reviews[review]);
            }
        }
        return reviews;
    }
}

module.exports = UserRepository;