const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');
const company = require('./middleware/company');


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
router.post('/assignments', [auth, company], AssignmentController.create.bind(AssignmentController));
router.put('/assignments', [auth, company], AssignmentController.update.bind(AssignmentController));
router.delete('/assignments', [auth, company], AssignmentController.delete);
router.get('/assignments', [auth, company], AssignmentController.getAllAssignments);

module.exports = router;
