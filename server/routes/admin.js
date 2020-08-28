const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.put('/signup', adminController.signup );
router.post('/login', adminController.login );
router.get('/userStatus/:userName', adminController.showUserStatus );
router.patch('/userStatus', adminController.updateUserStatus );

module.exports = router;
