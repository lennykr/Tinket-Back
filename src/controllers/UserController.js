const {log, errorResponse, promiseResponseHelper} = require('../helpers');
const {UserRepository} = require('../repositories/index');
const {UserService} = require('../services/index');

module.exports = class UserController {
    /**
     * Show the currently logged in user.
     * @param req
     * @param res
     */
    show(req, res) {
        promiseResponseHelper(req, res, UserService.show(req.params.id));
    }

    /**
     * Build company profile object from a request
     * @param req
     * @return {{contactInfo: {phoneNumber: *, linkedIn: *, email: *}, name: *, description: string | companyProfile.type.description | {type, required} | description, location: {country: (location.country|{type, required}|string), city: (location.city|{type, required}|string), postalCode: (location.postalCode|{type, required}|string)}}}
     * @private
     */
    _getCompanyProfile(req) {
        return {
            name: req.body.name,
            description: req.body.description,
            contactInfo: {
                email: req.body.contactInfo.email,
                phoneNumber: req.body.contactInfo.phoneNumber,
                linkedIn: req.body.contactInfo.linkedIn,
            },
            location: {
                country: req.body.location.country,
                city: req.body.location.city,
                postalCode: req.body.location.postalCode,
            },
        };
    }

    /**
     * Build maker profile object from a request
     * @param req
     * @return {{skills: *, contactInfo: {phoneNumber: string, linkedIn: *, email: *}, displayName: (makerProfile.type.displayName|{trim, type, required}|string), bio: (makerProfile.type.bio|{type, required}), dateOfBirth: (makerProfile.type.dateOfBirth|{type, required}), location: {country: (location.country|{type, required}|string), city: (location.city|{type, required}|string), postalCode: (location.postalCode|{type, required}|string)}, experience: (makerProfile.type.experience|{type, required})}}
     * @private
     */
    _getMakerProfile(req) {
        return {
            displayName: req.body.displayName,
            bio: req.body.bio,
            experience: req.body.experience,
            dateOfBirth: req.body.dateOfBirth,
            skills: req.body.skills,
            contactInfo: {
                email: req.body.contactInfo.email,
                phoneNumber: req.body.contactInfo.phoneNumber,
                linkedIn: req.body.contactInfo.linkedIn,
            },
            location: {
                country: req.body.location.country,
                city: req.body.location.city,
                postalCode: req.body.location.postalCode,
            },
        }
    }

    /**
     * Build _getReviewedBy object for non-anonymous reviews
     * @param req
     * @private
     */
    _getReviewedBy(req){
        return{
            _id: req.user._id,
            email: req.user.email,
            firstname: req.user.firstname,
            lastname: req.user.lastname
        }
    }

    /**
     * Get the logged in user's reviews.
     * @param req
     * @param res
     */
    getReviews(req, res){
        promiseResponseHelper(req, res, UserService.readReviews(req.user._id));
    }

    /**
     * Get reviews based on user id.
     * @param req
     * @param res
     */
    getReviewsById(req, res){
        promiseResponseHelper(req, res, UserService.readReviews(req.body._id));
    }

    /**
     * Get all reviews (where deletedAt == null).
     * @param req
     * @param res
     */
    getAllReviews(req, res){
        promiseResponseHelper(req, res, UserService.readAllReviews());
    }

    /**
     * Add a review to a user.
     * @param req
     * @param res
     */
    addReview(req, res){
        if(req.body.review.anonymous == false)
            req.body.review.reviewedBy = this._getReviewedBy(req);
        promiseResponseHelper(req, res, UserService.addReview(req.params.id, req.body.review));
    }

    /**
     * Delete one review.
     * @param req
     * @param res
     */
    deleteReview(req, res){
        promiseResponseHelper(req, res, UserService.deleteReview(req.params.id, req.body.reviewId));
    }

    /**
     * Update the maker profile section of the currently logged in user.
     * @param req
     * @param res
     */
    updateMyMakerProfile(req, res) {
        promiseResponseHelper(req, res, UserService.updateMakerProfile(req.params.id, req.user, this._getMakerProfile(req)));
    }

    /**
     * Update the company profile section of the currently logged in user.
     * @param req
     * @param res
     */
    updateMyCompanyProfile(req, res) {
        promiseResponseHelper(req, res, UserService.updateCompanyProfile(req.params.id, req.user, this._getCompanyProfile(req)));
    }

    /**
     * Update whole profile
     * @param req
     * @param res
     */
    update(req, res) {
        promiseResponseHelper(req, res, UserService.update(req.params.id, req.user, req.user.isAdmin ? req.body : {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            makerProfile: req.body.makerProfile != null ? this._getMakerProfile({body: req.body.makerProfile}) : null,
            companyProfile: req.body.companyProfile != null ? this._getCompanyProfile({body: req.body.companyProfile}) : null
        }));
    }

    /**
     * Perform a user login.
     * @param req
     * @param res
     */
    login(req, res) {
        promiseResponseHelper(req, res, UserService.login(req.body.email, req.body.password));
    }

    /**
     * Register a user (without a profile).
     * @param req
     * @param res
     */
    register(req, res) {
        promiseResponseHelper(req, res, UserService.register({
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.firstname
        }));
    }

    clearMyTokens(req, res) {
        promiseResponseHelper(req, res, UserService.deleteTokens(req.params.id));
    }

    updateMyPassword(req, res) {
        promiseResponseHelper(req, res, UserService.changePassword(
            req.params.id,
            req.body.password,
            req.body.newPassword
        ));
    }

    /**
     * (Admin) get all registered users
     * @param req
     * @param res
     */
    getAllUsers(req, res) {
        promiseResponseHelper(req, res, UserService.getAllUsers());
    }

    /**
     * (Admin) update user
     * @param req
     * @param res
     */
    updateUser(req, res) {
        promiseResponseHelper(req, res, UserService.update(req.body._id, req.body));
    }

    /**
     * (Admin) delete user
     * @param req
     * @param res
     */
    delete(req, res) {
        promiseResponseHelper(req, res, UserService.deleteUser(req.params.id));
    }

    /**
     * (Admin) add admin user account
     * @param req
     * @param res
     */
    createAdmin(req, res) {
        promiseResponseHelper(req, res, UserService.register({
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.firstname,
            isAdmin: true
        }));
    }
};
