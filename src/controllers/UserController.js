const {log, errorResponse, promiseResponseHelper} = require('../helpers');
const {UserRepository} = require('../repositories/index');
const {UserService} = require('../services/index');

module.exports = class UserController {
    /**
     * Show the currently logged in user.
     * @param req
     * @param res
     */
    showMe(req, res) {
        promiseResponseHelper(req, res, UserService.show(req.user._id));
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
     * Add a review to a user.
     * @param req
     * @param res
     */
    addReview(req, res){
        promiseResponseHelper(req, res, UserService.addReview(req.body._id, req.body.review));
    }

    /**
     * Delete one review.
     * @param req
     * @param res
     */
    deleteReview(req, res){
        promiseResponseHelper(req, res, UserService.deleteReview(req.body._id, req.body.reviewId));
    }

    /**
     * Update the maker profile section of the currently logged in user.
     * @param req
     * @param res
     */
    updateMyMakerProfile(req, res) {
        promiseResponseHelper(req, res, UserService.updateMakerProfile(req.user._id, this._getMakerProfile(req)));
    }

    /**
     * Update the company profile section of the currently logged in user.
     * @param req
     * @param res
     */
    updateMyCompanyProfile(req, res) {
        promiseResponseHelper(req, res, UserService.updateCompanyProfile(req.user._id, this._getCompanyProfile(req)));
    }

    /**
     * Update whole profile
     * @param req
     * @param res
     */
    updateMyProfile(req, res) {
        promiseResponseHelper(req, res, UserService.update(req.user._id, {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            makerProfile: req.body.makerProfile != null ? this._getMakerProfile({body: req.body.makerProfile}) : null,
            companyProfile: req.body.companyProfile != null ? this._getCompanyProfile({body: req.body.companyProfile}) : null
        }));
    }

    /**
     * Update the skills of the currently logged in user.
     * @param req
     * @param res
     */
    updateMySkills(req, res) {
        promiseResponseHelper(req, res, UserService.updateSkills(req.user._id, req.body));
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
        promiseResponseHelper(req, res, UserService.deleteTokens(req.user._id));
    }

    updateMyPassword(req, res) {
        promiseResponseHelper(req, res, UserService.changePassword(
            req.user._id,
            req.body.password,
            req.body.newPassword
        ));
    }
};
