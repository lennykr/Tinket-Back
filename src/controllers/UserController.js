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
     * Update the maker profile section of the currently logged in user.
     * @param req 
     * @param res 
     */
    updateMyMakerProfile(req, res) {
        promiseResponseHelper(req, res, UserService.updateCompanyProfile(req.user._id, {
            displayName: req.body.displayName,
            bio: req.body.bio,
            experience: req.body.experience,
            dateOfBirth: req.body.dateOfBirth,
            skills: req.body.skills,
            contactInfo: {
                email: req.body.contactInfo.email,
                phoneNumber: req.body.contactInfo.email,
                linkedIn: req.body.contactInfo.linkedIn,
            },
            location: {
                country: req.body.location.country,
                city: req.body.location.city,
                postalCode: req.body.location.postalCode,
            },
        }));
    }

    /**
     * Update the company profile section of the currently logged in user.
     * @param req 
     * @param res 
     */
    updateMyCompanyProfile(req, res) {
        promiseResponseHelper(req, res, UserService.updateCompanyProfile(req.user._id, {
            name: req.body.name,
            description: req.body.description,
            contactInfo: {
                email: req.body.contactInfo.email,
                phoneNumber: req.body.contactInfo.email,
                linkedIn: req.body.contactInfo.linkedIn,
            },
            location: {
                country: req.body.location.country,
                city: req.body.location.city,
                postalCode: req.body.location.postalCode,
            },
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
};
