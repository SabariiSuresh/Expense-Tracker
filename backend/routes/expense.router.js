const express = require('express');
const router = express.Router();
const {getDataBase} = require('../db/mongoDb');
const verifyToken = require('../security/auth.security')
const {  addExpenseHandler , getExpenseHandler , deleteExpenseHandler , updateExpenseHandler } = require('../controllers/expense.controller');

router.post('/addExpense' , verifyToken, addExpenseHandler (getDataBase));
router.get('/getExpense' , verifyToken , getExpenseHandler(getDataBase));
router.delete('/deleteExpense' , verifyToken , deleteExpenseHandler(getDataBase));
router.put('/updateExpense' , verifyToken , updateExpenseHandler(getDataBase));

module.exports = router;