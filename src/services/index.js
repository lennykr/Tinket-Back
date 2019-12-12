const UserService = require('./UserService');
const AssignmentService = require('./AssignmentService');
const SkillService = require('./SkillService');

module.exports = {
    UserService: new UserService(),
    AssignmentService: new AssignmentService(),
    SkillService: new SkillService()
};
