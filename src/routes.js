const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

const {
    UserController,
    SkillController
} = require('./controllers/index');

/********************************/
/*           Routes             */
/********************************/

router.post('/users/login', UserController.login);
router.post('/users', UserController.register);
router.get('/users/me', auth, UserController.showMe);
router.put('/users/me/maker-profile', auth, UserController.updateMyMakerProfile);
router.put('/users/me/company-profile', auth, UserController.updateMyCompanyProfile);

router.post('/skills', [auth, admin], SkillController.add.bind(SkillController));
router.get('/skills', [auth], SkillController.getAllSkills);
router.delete('/skills/:id', [auth, admin], SkillController.delete);
router.put('/skills/:id', [auth, admin], SkillController.update.bind(SkillController));

module.exports = router;
