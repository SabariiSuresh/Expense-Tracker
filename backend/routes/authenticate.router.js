const express = require('express');
const router = express.Router();
const {getDataBase} = require('../db/mongoDb');
const {registerUserHandler , loginUsersHandler} = require('../controllers/authenticate.controller');


router.post('/register' , registerUserHandler(getDataBase));
router.post('/login' , loginUsersHandler(getDataBase));

module.exports = router;