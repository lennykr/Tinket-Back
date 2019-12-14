const {promiseResponseHelper} = require('../helpers');
const {AssignmentService} = require('../services/index');

class AssignmentController {
    _toAssignmentPayload(req) {
        return {
            title: req.body.title,
            videoUrl: req.body.videoUrl,
            description: req.body.description,
            requiredSkills: req.body.requiredSkills,
            location: {
                country: req.body.location.country,
                city: req.body.location.city,
                postalCode: req.body.location.postalCode
            },
            open: req.body.open,
            archivedAt: req.body.archivedAt,
            createdBy: req.user._id
        };
    }

    show(req, res){
        promiseResponseHelper(req, res, AssignmentService.showById(req.params.id));
    }

    create(req, res) {
        promiseResponseHelper(req, res, AssignmentService.create(this._toAssignmentPayload(req)));
    }

    update(req, res) {
        promiseResponseHelper(req, res, AssignmentService.update(req.params.id, req.isAdmin ? req.body : this._toAssignmentPayload(req)));
    }

    delete(req, res) {
        promiseResponseHelper(req, res, AssignmentService.delete(req.params.id));
    }

    /**
     * Get the assignments a company (the current user) has created
     * @param req
     * @param res
     */
    showForUser(req, res) {
        // TODO: user? -> get available assignments based on user skills
        //       company? - > show my created assignments
        //       admin? -> show assignments a company has created
        promiseResponseHelper(req, res, AssignmentService.getAll(req.params.id));
    }
}

module.exports = AssignmentController;
