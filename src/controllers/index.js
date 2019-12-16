module.exports = {
    UserController: new (require('./UserController')),
    AssignmentController: new (require('./AssignmentController')),
    SkillController: new (require('./SkillController')),
    ReviewController: new (require('./ReviewController')),
    ApplicationController: new (require('./ApplicationController'))(),
    UploadController: new (require('./UploadController'))()
};
