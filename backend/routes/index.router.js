let express = require('express');
let router = express.Router();
let authRouter = require('./authenticate.router');
let expenseRouter = require('./expense.router');
let profileRouter = require('./profile.router');
let dashboardRouter = require('./dashboard.router');
let csvRouter = require('./csv.router');

router.get( '/' , function (req , res , next) {
    res.json("App is redy now")
});

router.use('/auth' , authRouter);
router.use('/expense' , expenseRouter);
router.use('/profile' , profileRouter);
router.use('/dashboard' , dashboardRouter);
router.use('/csv' , csvRouter)

module.exports = router;