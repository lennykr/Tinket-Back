const Assignment = require('../models/Assignment');
const BaseRepository = require('./BaseRepository');

class AssignmentRepository extends BaseRepository {
    constructor() {super(Assignment);}

    readAll(){
        return this.model.find({});
    }
}

module.exports = AssignmentRepository;
