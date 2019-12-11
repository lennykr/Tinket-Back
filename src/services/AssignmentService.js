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

    async update(id, assignment){
            if (!await AssignmentRepository.update(id, assignment));
                throw new Error('Updaten van een assignment mislukt');
    }

    async delete(id){
        if (!await AssignmentRepository.delete(id))
            throw new Error('Assignment niet gevonden!');
    }

    async getAll(){
        try{
            return await AssignmentRepository.readAll();
        }catch (ex) {
            log (ex);
            throw new Error('Ophalen van alle assignments is mislukt');
        }
    }
}

module.exports = AssignmentService;
