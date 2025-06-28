const express = require('express');
const router = express.Router();
const {getDataBase} = require('../db/mongoDb');
const verifyToken = require('../security/auth.security');
const {getUserProfileHandler , updateUserProfileHaldler } = require('../controllers/profile.controller');

router.get('/getUser' , verifyToken , getUserProfileHandler(getDataBase));
router.put('/updateUser' , verifyToken , updateUserProfileHaldler(getDataBase));

module.exports = router;