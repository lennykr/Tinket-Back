const UserService = require('./UserService');
const AssignmentService = require('./AssignmentService');
const SkillService = require('./SkillService');
const MediaService = require('./MediaService');
const ReviewService = require('./ReviewService');
const ApplicationService = require('./ApplicationService');
const UploadService = require('./UploadService');

module.exports = {
    UserService: new UserService(),
    AssignmentService: new AssignmentService(),
    SkillService: new SkillService(),
    MediaService: new MediaService(),
    ReviewService: new ReviewService(),
    ApplicationService: new ApplicationService(),
    UploadService: new UploadService()
};
