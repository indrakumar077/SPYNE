const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/user/search', authMiddleware, userController.searchUser);
router.put('/user/:id', authMiddleware, userController.updateUser);
router.delete('/user/:id', authMiddleware, userController.deleteUser);

module.exports = router;

