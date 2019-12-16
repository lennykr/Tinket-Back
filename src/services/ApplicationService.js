const {BadRequestError} = require("../exceptions");
const {ApplicationRepository} = require('../repositories/index');

class ApplicationService {
    getAssignmentApplications(assignmentId) {

    }

    async submitApplication(user, application) {
        if (!user.isAdmin && user.isCompany())
            throw new BadRequestError('Je hebt een maker account nodig om deze actie uit te voeren!');

        if ((await ApplicationRepository.readMakerApplication(application.maker, application.assignment)).length == 0)
            return await ApplicationRepository.create(application);

        throw new Error('Je hebt al een applicatie ingestuurd voor deze assignment!');
    }

    async delete(user, id) {
        if (!user.isAdmin && user.isCompany())
            throw new BadRequestError('Je hebt een maker account nodig om deze actie uit te voeren!');

        await ApplicationRepository.delete(id);
    }

    async get(id) {
        return await ApplicationRepository.readInclEverything(id);
    }

    async getByMaker(id) {
        return await ApplicationRepository.readEverythingWhere({maker: id}, 'assignment');
    }

    async getByAssignment(id) {
        return await ApplicationRepository.readEverythingWhere({assignment: id}, 'maker');
    }

    async updateApplication(id, application) {
        await ApplicationRepository.update(id, application);
    }
}

module.exports = ApplicationService;
