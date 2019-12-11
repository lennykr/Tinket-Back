const {log, errorResponse, promiseResponseHelper} = require('../helpers');
const {UserRepository} = require('../repositories/index');
const {AssignmentService} = require('../services/index');

module.exports = class AssignmentController {

    async create(req, res) {
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

    async update(req, res) {
        try {
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
        catch (ex) {
            console.error(ex);
            res.status(400).send('Updaten van een assignment mislukt');
        }
    }
};
