const {BadRequestError} = require("../exceptions");
const {ReviewRepository} = require('../repositories/index');
const ModerationService = require('./ModerationService');

class ReviewService extends ModerationService {

    constructor() {
        super(ReviewRepository);
    }

    /**
     * Returns all reviews that were flagged by a user
     * @return {Promise<void>}
     */
    async getAllFlagged() {
        // TODO: only get flagged reviews
        return await ReviewRepository.readAll({deletedAt: {$exists: false}}, "flaggedAt");
    }

    /**
     * Returns all reviews that were exclusively flagged by a user
     * @return {Promise<void>}
     */
    async getAllFlaggedAt() {
        return await ReviewRepository.readAll({deletedAt: {$exists: false}, flagResolvedAt: {$exists: false}, flaggedAt: {$exists: true}}, "flaggedAt");
    }

    /**
     * Returns all reviews that were exclusively flagResolvedAt by a user
     * @return {Promise<void>}
     */
    async getAllFlagResolvedAt() {
        return await ReviewRepository.readAll({deletedAt: {$exists: false}, flagResolvedAt: {$exists: true}}, "flagResolvedAt");
    }

    /**
     * Returns all reviews that were exclusively deletedAt by a user
     * @return {Promise<void>}
     */
    async getAllDeletedAt() {
        return await ReviewRepository.readAll({deletedAt: {$exists: true}}, "deletedAt");
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

        return await ReviewRepository.create(review);
    }

    async getReview(id) {
        return await ReviewRepository.readInclCreator(id);
    }

    async deleteReview(id) {
        await ReviewRepository.delete(id);
    }

    async getUserReviews(userId) {
        return await ReviewRepository.findReceivedReviews(userId);
    }

    async getWrittenReviews(userId) {
        return await ReviewRepository.findWrittenReviews(userId);
    }
}

module.exports = ReviewService;
