const {promiseResponseHelper} = require('../helpers');
const {ApplicationService} = require('../services/index');

class ApplicationController {
    /**
     * Submit user application
     * @param req
     * @param res
     */
    submit(req, res) {
        promiseResponseHelper(req, res, ApplicationService.submitApplication(req.user, {
            contacted: false,
            maker: req.params.id,
            assignment: req.body.assignment
        }));
    }

    delete(req, res) {
        promiseResponseHelper(req, res, ApplicationService.delete(req.params.id));
    }
}

module.exports = ApplicationController;
