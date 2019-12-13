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
                street: req.body.location.street,
                postalCode: req.body.location.postalCode
            },
            open: req.body.open,
            archivedAt: req.body.archivedAt
        };
    }

    create(req, res) {
        promiseResponseHelper(req, res, AssignmentService.create(this._toAssignmentPayload(req)));
    }

    update(req, res) {
        promiseResponseHelper(req, res, AssignmentService.update(req.body._id, this._toAssignmentPayload(req)));
    }

    delete(req, res) {
        promiseResponseHelper(req, res, AssignmentService.delete(req.body._id));
    }

    getAllAssignments(req, res) {
        promiseResponseHelper(req, res, AssignmentService.getAll());
    }

    getMyAssignments() {
        // TODO: get my assignments
    }
}

module.exports = AssignmentController;
