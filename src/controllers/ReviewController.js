const BadRequestError = require("../exceptions").BadRequestError;
const {promiseResponseHelper} = require('../helpers');
const {ReviewService} = require('../services/index');

class ReviewController {
    /**
     * (Admin) get all flagged reviews
     * @param req
     * @param res
     */
    getAll(req, res) {
        promiseResponseHelper(req, res, ReviewService.getAllFlagged());
    }

    /**
     * (Admin) get all exclusively flagged reviews
     * @param req
     * @param res
     */
    getAllFlaggedAt(req, res) {
        promiseResponseHelper(req, res, ReviewService.getAllFlaggedAt());
    }

    /**
     * (Admin) get all exclusively flagResolvedAt reviews
     * @param req
     * @param res
     */
    getAllFlagResolvedAt(req, res) {
        promiseResponseHelper(req, res, ReviewService.getAllFlagResolvedAt());
    }
    
    /**
     * (Admin) get all exclusively deletedAt reviews
     * @param req
     * @param res
     */
    getAllDeletedAt(req, res) {
        promiseResponseHelper(req, res, ReviewService.getAllDeletedAt());
    }

    /**
     * Create a new review
     * @param req
     * @param res
     */
    add(req, res) {
        promiseResponseHelper(req, res, ReviewService.add(req.body.reviewed, {
            creator: {
                anonymous: req.body.anonymous,
                user: req.user._id
            },
            reviewed: req.body.reviewed,
            description: req.body.description,
            score: req.body.score
        }));
    }

    get(req, res) {
        promiseResponseHelper(req, res, ReviewService.getReview(req.params.id));
    }


    delete(req, res) {
        promiseResponseHelper(req, res, ReviewService.deleteReview(req.params.id));
    }

    getUserReviews(req, res) {
        const userId = req.params.id;
        promiseResponseHelper(req, res, ReviewService.getUserReviews(userId));
    }

    getWrittenReviews(req, res) {
        promiseResponseHelper(req, res, ReviewService.getWrittenReviews(req.params.id));
    }

    flag(req, res) {
        promiseResponseHelper(req, res, ReviewService.flag(req.params.id));
    }

    resolveFlag(req, res) {
        promiseResponseHelper(req, res, ReviewService.resolveFlagged(req.params.id));
    }

    ignoreFlag(req, res) {
        promiseResponseHelper(req, res, ReviewService.ignoreFlagged(req.params.id));
    }

}

module.exports = ReviewController;
