const Review = require('../models/Review');
const BaseRepository = require('./BaseRepository');

class ReviewRepository extends BaseRepository {
    constructor() {super(Review);}

    readAll(filter = {}) {
        return this.model.find(filter);
    }

    /**
     * Check if a given user has has reviewed another user
     * @param reviewedId the id of the user who receives the review
     * @param reviewWriterId the id of the user who is reviewing
     * @return {Promise<boolean>}
     */
    async hasReviewed(reviewedId, reviewWriterId) {
       // TODO: figure out if there's a mongoose method to do this in one go
        const reviews = await this.model.find({reviewed: reviewedId});

        if (reviews.length == 0) return false;

        return reviews.some(review => review.creator.user.toString() == reviewWriterId);
    }
}

module.exports = ReviewRepository;
