const UserService = require('./UserService');
const SkillService = require('./SkillService');

module.exports = {
    UserService: new UserService(),
    SkillService: new SkillService()
};

