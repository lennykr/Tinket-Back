const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');


const {
    UserController
} = require('./controllers/index');

/********************************/
/*           Routes             */
/********************************/

router.post('/users/login', UserController.login);
router.post('/users', UserController.register);
router.get('/users/me', auth, UserController.showMe);
router.put('/users/me/user-profile', auth, UserController.updateMyMakerProfile);
router.put('/users/me/company-profile', auth, UserController.updateMyCompanyProfile);

module.exports = router;
