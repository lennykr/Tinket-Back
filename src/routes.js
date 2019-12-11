const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');


const {
    UserController,
    AssignmentController
} = require('./controllers/index');

//User routes
router.post('/users/login', UserController.login);
router.post('/users', UserController.register);
router.get('/users/:id', UserController.getProfile);
router.delete('/users/:id', UserController.delete);
router.put('/users', auth, UserController.updateProfile);

//Assignment Routes
router.post('/assignments', AssignmentController.create)
router.put('/assignments', AssignmentController.update)

module.exports = router;
