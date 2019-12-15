const BadRequestError = require("../exceptions").BadRequestError;
const {ApplicationRepository} = require('../repositories/index');
const {log} = require('../helpers');

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

    async delete(user, id) {
        if (!user.isAdmin && user.isCompany())
            throw new BadRequestError('Je hebt een maker account nodig om deze actie uit te voeren!');

        try {
            await ApplicationRepository.delete(id);
        } catch (ex) {
            log(ex);
            throw new Error('Verwijderen van een application is mislukt');
        }
    }

    async get(id) {
        try {
            return await ApplicationRepository.readInclEverything(id);
        } catch (ex) {
            log(ex);
            throw new Error('Verwijderen van een application is mislukt');
        }
    }

    async getByMaker(id) {
        try {
            return await ApplicationRepository.readEverythingWhere({maker: id}, 'assignment');
        } catch (ex) {
            log(ex);
            throw new Error('Verwijderen van een application is mislukt');
        }
    }

    async getByAssignment(id) {
        try {
            return await ApplicationRepository.readEverythingWhere({assignment: id}, 'maker');
        } catch (ex) {
            log(ex);
            throw new Error('Ophalen van een applications is mislukt');
        }
    }

    async updateApplication(id, application) {
        try {
            await ApplicationRepository.update(id, application);
        } catch (ex) {
            log(ex);
            throw new Error('Toevoegen van een application is mislukt');
        }
    }
}

module.exports = ApplicationService;
