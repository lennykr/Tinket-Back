const {AssignmentRepository, UserRepository} = require('../repositories/index');
const ModerationService = require('./ModerationService');

class AssignmentService extends ModerationService {

    constructor() {
        super(AssignmentRepository);
    }

    /**
     * Returns all assignments that were exclusively flagged by a user
     * @return {Promise<void>}
     */
    async getAllFlaggedAt() {
        return await AssignmentRepository.readAll({deletedAt: {$exists: false}, flagResolvedAt: {$exists: false}, flaggedAt: {$exists: true}});
    }

    /**
     * Returns all assignments that were exclusively flagResolvedAt by a user
     * @return {Promise<void>}
     */
    async getAllFlagResolvedAt() {
        return await AssignmentRepository.readAll({deletedAt: {$exists: false}, flagResolvedAt: {$exists: true}});
    }

        /**
     * Returns all assignments that were exclusively deletedAt by a user
     * @return {Promise<void>}
     */
    async getAllDeletedAt() {
        return await AssignmentRepository.readAll({deletedAt: {$exists: true}});
    }

    async create(data) {
        return await AssignmentRepository.create(data);
    }

    async update(id, assignment) {
        if (!await AssignmentRepository.updateWhere({_id: id}, assignment))
            throw new Error('Updaten van een assignment mislukt');
    }

    /**
     * Delete an assignment
     * @param id assignment id
     * @param creatorId creator of the assignment
     * @return {Promise<void>}
     */
    async delete(id){
       if (!await AssignmentRepository.deleteOneWhere({_id: id}))
           throw new Error('Assignment niet gevonden');
    }

    /**
     * Get all assignments from specified user (company) id
     * @param id
     * @return {Promise<void>}
     */
    async getAll(id){
        return await AssignmentRepository.readAllWhere({createdBy: id});
    }

    /**
     * Get an assignment by its id
     * @param id
     * @return {Promise<void>}
     */
    async showById(id){
        return await AssignmentRepository.readAllById(id);
    }

    async showAll(){
        return await AssignmentRepository.readAllWhere({});
    }

    async getAllRecommended(userId) {
        const user = await UserRepository.read(userId);
        return await AssignmentRepository.readAllWhere({requiredSkills: { $in : user.makerProfile.skills} , open: true, deletedAt: {$exists: false}, archivedAt: null});
    }
}

module.exports = AssignmentService;
