const {log} = require('../helpers');
const {AssignmentRepository} = require('../repositories/index');

class AssignmentService {
    async create(data) {
        try {
            console.log(data);
            const assignment = await AssignmentRepository.create(data);
            console.log(assignment);
            return assignment;
        }
        catch(ex) {
            log (ex);
            throw new Error('Fout bij het aanmaken van een nieuwe assignment');
        }
    }

    async update(id, assignment){
        try{
            const newAssignment = await AssignmentRepository.update(id, assignment);
        }
        catch (ex) {
            log (ex);
            throw new Error('Updaten van een assignment mislukt');
        }
    }
}

module.exports = AssignmentService;
