const express = require('express');
const router = express.Router();
const {getDataBase} = require('../db/mongoDb');
const verifyToken = require('../security/auth.security')
const dashboardController= require('../controllers/dashboard.controller');

router.get('/getSummary' , verifyToken , dashboardController.getSummaryEachExpense(getDataBase)); 
router.get('/getStatus' , verifyToken , dashboardController.getExpenseStatus(getDataBase)); 
router.get('/getMonthly' , verifyToken , dashboardController.getMonthlysummary(getDataBase)); 


module.exports = router;