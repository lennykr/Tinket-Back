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
            throw new Error('Toevoegen van een application is mislukt');
        }
    }

    async delete(id) {
        try {
            await ApplicationRepository.delete(id);
        } catch (ex) {
            log(ex);
            throw new Error('Verwijderen van een application is mislukt');
        }
    }
}

module.exports = ApplicationService;
