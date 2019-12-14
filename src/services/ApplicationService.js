const BadRequestError = require("../exceptions").BadRequestError;
const {ApplicationRepository} = require('../repositories/index');

class ApplicationService {
    getAssignmentApplications(assignmentId) {

    }

    async submitApplication(user, application) {
        if (!user.isAdmin && user.isCompany())
            throw new BadRequestError('Je hebt een maker account nodig om deze actie uit te voeren!');

        try {
            return await ApplicationRepository.create(application);
        } catch (ex) {
            log(ex);
            throw new Error('Ophalen van een assignment is mislukt');
        }
    }
}

module.exports = ApplicationService;
