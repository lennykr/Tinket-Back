const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');
const company = require('./middleware/company');
const admin = require('./middleware/admin');
const validateAdminOrUserId = require('./middleware/validators/validateAdminOrUserId');
const adminOrCompany = require('./middleware/companyOrAdmin');
const {
    UserController,
    AssignmentController,
    SkillController,
    ReviewController,
    ApplicationController
} = require('./controllers/index');

/********************************/
/*           Routes             */
/********************************/

// -- User routes --
router.get('/users', [auth, admin], UserController.getAllUsers);
router.post('/users/login', UserController.login);
router.post('/users', UserController.register.bind(UserController));
router.get('/users/:id', [auth, validateAdminOrUserId], UserController.show);
router.put('/users/:id', [auth, validateAdminOrUserId], UserController.update.bind(UserController));
router.delete('/users/:id', [auth, validateAdminOrUserId], UserController.delete);
router.put('/users/:id/skills', auth, UserController.updateMySkills);

// GET /users/:id/skills (skillController#showForUser) Admin, Me as maker
router.get('/users/:id/assignments', [auth, company, validateAdminOrUserId], AssignmentController.showForUser);
router.get('/users/:id/reviews', auth, ReviewController.getUserReviews);
// GET /users/:id/applications (applicationController#showForUser) Admin, Me as Maker
// GET /assignments/:id/applications (applicationController#showForAssignment) Auth
router.post('/users/:id/applications', auth, ApplicationController.submit);

router.put('/users/:id/maker-profile', [auth, validateAdminOrUserId], UserController.updateMyMakerProfile.bind(UserController));
router.put('/users/:id/company-profile', [auth, validateAdminOrUserId], UserController.updateMyCompanyProfile.bind(UserController));
router.put('/users/:id/password', [auth, validateAdminOrUserId], UserController.updateMyPassword);
router.delete('/users/:id/tokens', [auth, validateAdminOrUserId], UserController.clearMyTokens);
// Upload routes | A company representative can upload a video to an assignment.
// Discover routes | A maker can discover assignments.

// -- Skills --
router.get('/skills', [auth], SkillController.getAllSkills);
router.post('/skills', [auth, admin], SkillController.add.bind(SkillController));
router.put('/skills/:id', [auth, admin], SkillController.update.bind(SkillController));
router.delete('/skills/:id', [auth, admin], SkillController.delete);


// -- Assignments --
// GET /assignments (skillController#index) Admin
router.post('/assignments', [auth, company], AssignmentController.create.bind(AssignmentController));
router.get('/assignments/:id', auth, AssignmentController.show);
router.put('/assignments/:id', [auth, adminOrCompany], AssignmentController.update.bind(AssignmentController));
router.delete('/assignments/:id', [auth, admin], AssignmentController.delete);


// -- Reviews --
router.get('/reviews', [auth, admin], ReviewController.getAll);
router.post('/reviews', auth, ReviewController.add);
router.get('/reviews/:id', auth, ReviewController.get);
router.delete('/reviews/:id', auth, ReviewController.delete);


// -- Applications --
router.get('/applications/:id', auth, ApplicationController.show);
// PUT /applications/:id (applicationController#update) Auth
router.put('/applications/:id', auth, ApplicationController.update);
router.delete('/applications/:id', auth, ApplicationController.delete);

// -- Others --
router.post('/admins', [auth, admin], UserController.createAdmin);

// NOTES
// TODO: resolve flagged reviews (admin)
// TODO: flag a review (user)

module.exports = router;
