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
        promiseResponseHelper(req, res, UserService.updateMakerProfile(req.user._id, {
            displayName: req.body.displayName,
        }));
    }

    /**
     * Update the company profile section of the currently logged in user.
     * @param req 
     * @param res 
     */
    updateMyCompanyProfile(req, res) {
        promiseResponseHelper(req, res, UserService.updateCompanyProfile(req.user._id, {
            displayName: req.body.displayName,
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
