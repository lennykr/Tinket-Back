// this import is required for .populate() to work
const Skill = require('../models/Skill');
const Assignment = require('../models/Assignment');
const BaseRepository = require('./BaseRepository');

class AssignmentRepository extends BaseRepository {
    constructor() {super(Assignment);}

    readAllWhere(conditions) {
        return this.model.find(conditions).populate('requiredSkills');
    }

    readInclApplications(id) {
        return this.model.findById(id).populate('applications');
    }

    // TODO: move these to BaseRepository perhaps?
    async updateWhere(conditions, data) {
        const result = await this.model.updateOne(conditions, { $set: data });
        return result.n > 0;
    }

    async deleteOneWhere(conditions) {
        const result = await this.model.deleteOne(conditions);
        return result.n > 0;
    }
}

module.exports = AssignmentRepository;
