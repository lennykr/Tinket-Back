const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');
const company = require('./middleware/company');
const admin = require('./middleware/admin');
const validateAdminOrUserId = require('./middleware/validators/validateAdminOrUserId');
const validateAdminOrUserIdOrCompany = require('./middleware/validators/validateAdminOrUserIdOrCompany');
const adminOrCompany = require('./middleware/companyOrAdmin');
const {multipartUpload, videoConvert} = require('./middleware/upload');
const {
    UserController,
    AssignmentController,
    SkillController,
    ReviewController,
    ApplicationController,
    UploadController
} = require('./controllers/index');

/********************************/
/*           Routes             */
/********************************/

// -- User routes --
router.get('/users', [auth, admin], UserController.getAllUsers);
router.post('/users/login', UserController.login);
router.post('/users', UserController.register.bind(UserController));
router.get('/users/:id', auth, UserController.show); // TODO: :)
router.put('/users/:id', [auth, validateAdminOrUserId], UserController.update.bind(UserController));
router.delete('/users/:id', [auth, validateAdminOrUserId], UserController.delete);
router.put('/users/:id/skills', auth, UserController.updateMySkills);

// assignments a company has created
router.get('/users/:id/assignments', [auth, company, validateAdminOrUserId], AssignmentController.showForUser);
// recommended assignments for a user
router.get('/users/:id/assignments/discover', [auth, validateAdminOrUserId], AssignmentController.showRecommendedForUser);
router.get('/users/:id/reviews', auth, ReviewController.getUserReviews);
router.get('/users/:id/writtenReviews', auth, ReviewController.getWrittenReviews);
router.get('/users/:id/applications', [auth, validateAdminOrUserId], ApplicationController.showForUser);
router.get('/assignments/:id/applications', auth, ApplicationController.showForAssignment);
router.post('/users/:id/applications', auth, ApplicationController.submit);

router.put('/users/:id/maker-profile', [auth, validateAdminOrUserId], UserController.updateMyMakerProfile.bind(UserController));
router.put('/users/:id/company-profile', [auth, validateAdminOrUserId], UserController.updateMyCompanyProfile.bind(UserController));
router.put('/users/:id/password', [auth, validateAdminOrUserId], UserController.updateMyPassword);
router.delete('/users/:id/tokens', [auth, validateAdminOrUserId], UserController.clearMyTokens);
// Upload routes | A company representative can upload a video to an assignment.

// -- Skills --
router.get('/skills', [auth], SkillController.getAllSkills);
router.post('/skills', [auth, admin], SkillController.add.bind(SkillController));
router.put('/skills/:id', [auth, admin], SkillController.update.bind(SkillController));
router.delete('/skills/:id', [auth, admin], SkillController.delete);


// -- Assignments --
router.get('/assignments/flaggedAt', [auth, admin], AssignmentController.getAllFlaggedAt);
router.get('/assignments/flagResolvedAt', [auth, admin], AssignmentController.getAllFlagResolvedAt);
router.get('/assignments/deletedAt', [auth, admin], AssignmentController.getAllDeletedAt);
router.get('/assignments', [auth, admin], AssignmentController.showAll.bind(AssignmentController));
router.post('/assignments', [auth, company], AssignmentController.create.bind(AssignmentController));
router.get('/assignments/:id', auth, AssignmentController.show);
router.put('/assignments/:id', [auth, adminOrCompany], AssignmentController.update.bind(AssignmentController));
router.delete('/assignments/:id', [auth, admin], AssignmentController.delete);
router.get('/assignments/:id/flag', auth, AssignmentController.flag);
router.get('/assignments/:id/flag/resolve', [auth, admin], AssignmentController.resolveFlag);
router.get('/assignments/:id/flag/ignore', [auth, admin], AssignmentController.ignoreFlag);
router.get('/assignments/:id/flag/ignore/undo', [auth, admin], AssignmentController.undoIgnoreFlag);


// -- Reviews --
router.get('/reviews', [auth, admin], ReviewController.getAll);
router.get('/reviews/flaggedAt', [auth, admin], ReviewController.getAllFlaggedAt);
router.get('/reviews/flagResolvedAt', [auth, admin], ReviewController.getAllFlagResolvedAt);
router.get('/reviews/deletedAt', [auth, admin], ReviewController.getAllDeletedAt);
router.post('/reviews', auth, ReviewController.add);
router.get('/reviews/:id', auth, ReviewController.get);
router.delete('/reviews/:id', auth, ReviewController.delete);
router.get('/reviews/:id/flag', auth, ReviewController.flag);
router.get('/reviews/:id/flag/resolve', [auth, admin], ReviewController.resolveFlag);
router.get('/reviews/:id/flag/ignore', [auth, admin], ReviewController.ignoreFlag);
router.get('/reviews/:id/flag/ignore/undo', [auth, admin], ReviewController.undoIgnoreFlag);


// -- Applications --
router.get('/applications/:id', auth, ApplicationController.show);
router.put('/applications/:id', auth, ApplicationController.update);
router.delete('/applications/:id', auth, ApplicationController.delete);

// -- Others --
router.post('/admins', [auth, admin], UserController.createAdmin);
router.post('/mail', auth, UserController.sendMail);

// -- Video Uploads --
router.post('/upload', [auth, company, multipartUpload, videoConvert], UploadController.uploadVideo);
router.post('/upload/:id', UploadController.onUploadDone); // NOTE: this route is used by cloudinary CDN - DO NOT ADD auth!
router.get('/upload/:id', [auth, company], UploadController.getUploaded.bind(UploadController));

module.exports = router;
