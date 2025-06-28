const express = require('express');
const router = express.Router();
const {getDataBase} = require('../db/mongoDb');
const verifyToken = require('../security/auth.security');
const csvFileController= require('../controllers/csvFile.controller');
const multer = require('multer');

const upload = multer( { dest : 'uploads/' } )

router.post('/import' , verifyToken , upload.single('file') , csvFileController(getDataBase));

module.exports = router;