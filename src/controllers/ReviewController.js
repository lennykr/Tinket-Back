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

}

module.exports = ReviewController;
