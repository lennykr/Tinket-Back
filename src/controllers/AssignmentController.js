const {promiseResponseHelper} = require('../helpers');
const {AssignmentService} = require('../services/index');

class AssignmentController {
    
    //Not working
    /*_toAssignmentPayload(req) {
        console.log(req);
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
            }
        };
    }*/

    create(req, res) {
        promiseResponseHelper(req, res, AssignmentService.create({
            title: req.body.title,
            videoUrl: req.body.videoUrl,
            description: req.body.description,
            requiredSkills: req.body.requiredSkills,
            location: {
                country: req.body.location.country,
                city: req.body.location.city,
                street: req.body.location.street,
                postalCode: req.body.location.postalCode
            }
        }));
    }

    update(req, res) {
        promiseResponseHelper(req, res, AssignmentService.update(req.body._id, {
            title: req.body.title,
            videoUrl: req.body.videoUrl,
            description: req.body.description,
            requiredSkills: req.body.requiredSkills,
            location: {
                country: req.body.location.country,
                city: req.body.location.city,
                street: req.body.location.street,
                postalCode: req.body.location.postalCode
            }
        }));
    }

    delete(req, res) {
        promiseResponseHelper(req, res, AssignmentService.delete(req.body._id));
    }

    getAllAssignments(req, res) {
        promiseResponseHelper(req, res, AssignmentService.getAll());
    }
};

module.exports = AssignmentController;