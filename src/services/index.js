const UserService = require('./UserService');
const AssignmentService = require('./AssignmentService');
const SkillService = require('./SkillService');
const ReviewService = require('./ReviewService');

module.exports = {
    UserService: new UserService(),
    AssignmentService: new AssignmentService(),
    SkillService: new SkillService(),
    ReviewService: new ReviewService()
};
