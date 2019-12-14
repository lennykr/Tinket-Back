const {BadRequestError} = require("../exceptions");
const {log} = require('../helpers');
const {ReviewRepository} = require('../repositories/index');

class ReviewService {
    /**
     * Returns all reviews that were flagged by a user
     * @return {Promise<void>}
     */
    async getAllFlagged() {
        try {
            // TODO: only get flagged reviews
            return await ReviewRepository.readAll({deletedAt: {$exists: false}});
        } catch (ex) {
            log(ex);
            throw new Error('Er is iets mis gegaan bij het ophalen van alle skills');
        }
    }

    /**
     * Write a new review
     * @param reviewerId
     * @param review
     * @return {Promise<void>}
     */
    async add(reviewerId, review) {
        // users can't review themselves
        if (review.creator.user == reviewerId)
            throw new BadRequestError('Je kan jezelf geen reviews geven!');

        // users can't review someone twice
        if (await ReviewRepository.hasReviewed(reviewerId, review.creator.user))
            throw new BadRequestError('Je hebt al een review geschreven!');

        try {
            return await ReviewRepository.create(review);
        } catch (ex) {
            log(ex);
            throw new Error('Er is iets mis gegaan bij het aanmaken van deze review');
        }
    }

    async getReview(id) {
        try {
            return await ReviewRepository.read(id);
        } catch (ex) {
            log(ex);
            throw new Error('Er is iets mis gegaan bij het ophalen van deze review');
        }
    }

    async deleteReview(id) {
        try {
            await ReviewRepository.delete(id);
        } catch (ex) {
            log(ex);
            throw new Error('Er is iets mis gegaan bij het verwijderen van deze review');
        }
    }

    async getUserReviews(userId) {
        try {
            return await ReviewRepository.findReceivedReviews(userId);
        } catch (ex) {
            log(ex);
            throw new Error('Er is iets mis gegaan bij het ophalen van reviews');
        }
    }

}

module.exports = ReviewService;
