const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

const {
    UserController,
    SkillController
} = require('./controllers/index');


router.post('/users/login', UserController.login);
router.post('/users', UserController.register);
router.get('/users/:id', UserController.getProfile);
router.delete('/users/:id', UserController.delete);
router.patch('/users/:id', UserController.update);

router.post('/skills', [auth, admin], SkillController.add.bind(SkillController));
router.get('/skills', [auth], SkillController.getAllSkills);
router.delete('/skills/:id', [auth, admin], SkillController.delete);
router.put('/skills/:id', [auth, admin], SkillController.update.bind(SkillController));

module.exports = router;
