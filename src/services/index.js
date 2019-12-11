const UserService = require('./UserService');
const AssignmentService = require('./AssignmentService');

module.exports = {
    UserService: new UserService(),
    AssignmentService: new AssignmentService()
};

