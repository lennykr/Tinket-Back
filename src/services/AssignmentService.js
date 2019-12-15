const {log} = require('../helpers');
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
        try {
            return await AssignmentRepository.readAll({deletedAt: {$exists: false}, flagResolvedAt: {$exists: false}, flaggedAt: {$exists: true}});
        } catch (ex) {
            log(ex);
            throw new Error('Er is iets mis gegaan bij het ophalen van de flaggedAt assignments');
        }
    }

    /**
     * Returns all assignments that were exclusively flagResolvedAt by a user
     * @return {Promise<void>}
     */
    async getAllFlagResolvedAt() {
        try {
            return await AssignmentRepository.readAll({deletedAt: {$exists: false}, flagResolvedAt: {$exists: true}});
        } catch (ex) {
            log(ex);
            throw new Error('Er is iets mis gegaan bij het ophalen van de flagResolvedAt assignments');
        }
    }

        /**
     * Returns all assignments that were exclusively deletedAt by a user
     * @return {Promise<void>}
     */
    async getAllDeletedAt() {
        try {
            return await AssignmentRepository.readAll({deletedAt: {$exists: true}});
        } catch (ex) {
            log(ex);
            throw new Error('Er is iets mis gegaan bij het ophalen van de deletedAt assignments');
        }
    }

    async create(data) {
        try {
            return await AssignmentRepository.create(data);
        }
        catch(ex) {
            log (ex);
            throw new Error('Fout bij het aanmaken van een nieuwe assignment');
        }
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
        try{
            return await AssignmentRepository.readAllWhere({createdBy: id});
        }catch (ex) {
            log (ex);
            throw new Error('Ophalen van alle assignments is mislukt');
        }
    }

    /**
     * Get an assignment by its id
     * @param id
     * @return {Promise<void>}
     */
    async showById(id){
        try{
            return await AssignmentRepository.readAllById(id);
        }catch (ex) {
            log (ex);
            throw new Error('Ophalen van een assignment is mislukt');
        }
    }

    async showAll(){
        try{
            return await AssignmentRepository.readAllWhere({});
        }catch (ex) {
            log (ex);
            throw new Error('Ophalen van assignments is mislukt');
        }
    }

    async getAllRecommended(userId) {
        try{
            const user = await UserRepository.read(userId);
            return await AssignmentRepository.readAllWhere({requiredSkills: { $in : user.makerProfile.skills} , open: true});
        }catch (ex) {
            log (ex);
            throw new Error('Ophalen van recommended assignments is mislukt');
        }
    }
}

module.exports = AssignmentService;
