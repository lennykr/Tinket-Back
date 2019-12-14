const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');
const company = require('./middleware/company');
const admin = require('./middleware/admin');
const adminOrUser = require('./middleware/idkanameforthis');
const adminOrCompany = require('./middleware/companyOrAdmin');
const {
    UserController,
    AssignmentController,
    SkillController
} = require('./controllers/index');

/********************************/
/*           Routes             */
/********************************/

// -- User routes --
router.get('/users', [auth, admin], UserController.getAllUsers);
router.post('/users/login', UserController.login);
router.post('/users', UserController.register.bind(UserController));
router.get('/users/:id', [auth, adminOrUser], UserController.show);
router.put('/users/:id', [auth, adminOrUser], UserController.update.bind(UserController));
router.delete('/users/:id', [auth, adminOrUser], UserController.delete);

// -- Relationships --
// GET /users/:id/skills (skillController#showForUser) Admin, Me as maker
router.get('/users/:id/assignments', [auth, company, adminOrUser], AssignmentController.showForUser);
// GET /users/:id/reviews (reviewController#showForUser) Auth
// GET /users/:id/applications (applicationController#showForUser) Admin, Me as Maker
// GET /assignments/:id/applications (applicationController#showForAssignment) Auth
// POST /assignments/:id/applications (applicationController#showForAssignment) Me as maker


// -- Other --
router.put('/users/:id/maker-profile', [auth, adminOrUser], UserController.updateMyMakerProfile.bind(UserController));
router.put('/users/:id/company-profile', [auth, adminOrUser], UserController.updateMyCompanyProfile.bind(UserController));
router.put('/users/:id/password', [auth, adminOrUser], UserController.updateMyPassword);
router.delete('/users/:id/tokens', [auth, adminOrUser], UserController.clearMyTokens);
// Upload routes | A company representative can upload a video to an assignment.
// Discover routes | A maker can discover assignments.
router.post('/admins', [auth, admin], UserController.createAdmin);

// -- Skills --
router.get('/skills', [auth], SkillController.getAllSkills);
router.post('/skills', [auth, admin], SkillController.add.bind(SkillController));
//  GET /skills/:id (skillController#show) Admin
router.put('/skills/:id', [auth, admin], SkillController.update.bind(SkillController));
router.delete('/skills/:id', [auth, admin], SkillController.delete);


// -- Assignments --
// GET /assignments (skillController#index) Admin
router.post('/assignments', [auth, company], AssignmentController.create.bind(AssignmentController));
// GET /assignments/:id (skillController#show) Auth
router.put('/assignments/:id', [auth, adminOrCompany], AssignmentController.update.bind(AssignmentController));
router.delete('/assignments/:id', [auth, admin], AssignmentController.delete);


// -- Reviews --
// GET /reviews (reviewController#index) Admin
// POST /reviews (reviewController#create) Auth
// GET /reviews/:id (reviewController#show) Auth
router.post('/reviews/:id', auth, UserController.addReview);
// DELETE /reviews/:id (reviewController#destroy) Auth
router.delete('/reviews/:id', auth, UserController.deleteReview);


// -- Applications --
// GET /applications/:id (applicationController#show) Auth
// PUT /applications/:id (applicationController#update) Auth
// DELETE /applications/:id (applicationController#destroy) Me as maker


module.exports = router;
