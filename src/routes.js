const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');
const company = require('./middleware/company');
const admin = require('./middleware/admin');
const {
    UserController,
    AssignmentController,
    SkillController
} = require('./controllers/index');

/********************************/
/*           Routes             */
/********************************/

// User routes
router.post('/users/login', UserController.login);
router.post('/users', UserController.register.bind(UserController));
router.post('/users/review', UserController.addReview);
router.delete('/users/review', [auth, admin], UserController.deleteReview);
router.get('/users/me', auth, UserController.showMe);
router.put('/users/me/maker-profile', auth, UserController.updateMyMakerProfile.bind(UserController));
router.put('/users/me/company-profile', auth, UserController.updateMyCompanyProfile.bind(UserController));
router.put('/users/me/skills', auth, UserController.updateMySkills);
router.put('/users/me', auth, UserController.updateMyProfile.bind(UserController));
router.post('/users/me/assignments', [auth, company], AssignmentController.create.bind(AssignmentController));
router.put('/users/me/assignments', [auth, company], AssignmentController.update.bind(AssignmentController));
router.delete('/users/me/assignments', [auth, company], AssignmentController.delete);
router.get('/users/me/assignments', [auth, company], AssignmentController.getMyAssignments);
router.delete('/users/me/tokens', auth, UserController.clearMyTokens);
router.put('/users/me/change-password', auth, UserController.updateMyPassword);

// Skill routes
router.post('/skills', [auth, admin], SkillController.add.bind(SkillController));
router.get('/skills', [auth], SkillController.getAllSkills);
router.delete('/skills/:id', [auth, admin], SkillController.delete);
router.put('/skills/:id', [auth, admin], SkillController.update.bind(SkillController));

router.get('/users', [auth, admin], UserController.getAllUsers);
router.put('/users', [auth, admin], UserController.updateUser);
router.delete('/users', [auth, admin], UserController.deleteUser);
router.post('/admins', [auth, admin], UserController.createAdmin);

module.exports = router;
