const express = require('express');
const router = express.Router();


const {
    UserController
} = require('./controllers/index');


router.post('/users/login', UserController.login);
router.post('/users', UserController.register);
router.get('/users/:id', UserController.getProfile);
router.delete('/users/:id', UserController.delete);
router.patch('/users/:id', UserController.update);

module.exports = router;
