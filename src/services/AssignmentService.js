const {log} = require('../helpers');
const {AssignmentRepository} = require('../repositories/index');

class AssignmentService {
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
            return await AssignmentRepository.readInclApplications(id);
        }catch (ex) {
            log (ex);
            throw new Error('Ophalen van een assignment is mislukt');
        }
    }
}

module.exports = AssignmentService;
