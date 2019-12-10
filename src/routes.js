const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');


const {
    UserController
} = require('./controllers/index');


router.post('/users/login', UserController.login);
router.post('/users', UserController.register);
router.get('/users/:id', UserController.getProfile);
router.delete('/users/:id', UserController.delete);
router.put('/users', auth, UserController.updateProfile);

module.exports = router;
