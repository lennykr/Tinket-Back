const Assignment = require('../models/Assignment');
const BaseRepository = require('./BaseRepository');

class AssignmentRepository extends BaseRepository {
    constructor() {super(Assignment);}
}

module.exports = AssignmentRepository;
