
const { ObjectId } = require('mongodb');

function getSummaryEachExpense(getDataBase) {

    return async function getExpensesummary(req, res) {

        try {

            const db = getDataBase();
            const id = req.user.userId;

            const userId = new ObjectId(id);

            const summary = await db.collection('expense').aggregate([
                { $match: { userId } },
                {
                    $group: {
                        _id: '$category',
                        total: { $sum: '$amount' }
                    }
                }, { $sort: { total: -1 } }
            ]).toArray();

            res.json(summary.map(item => ({ category: item._id, total: item.total })));

        } catch (err) {
            console.error("Error ", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}


function getExpenseStatus(getDataBase) {
    return async function getStatus(req, res) {

        try {

            const db = getDataBase();
            const userId  = new ObjectId(req.user.userId);

            const expenseStatus = await db.collection('expense').find({userId}).sort({date : 1}).toArray();

            if (expenseStatus.length === 0 ){
               return res.json( {   totalAmount : 0 , totalCount : 0 , firstDate : null , lastDate : null  } )
            }

            const totalAmount = expenseStatus.reduce( ( sum , expense)=> sum + expense.amount , 0 );
            const totalCount = expenseStatus.length;
            const firstDate = expenseStatus[0]?.date || null;
            const lastDate = expenseStatus[expenseStatus.length-1]?.date || null;

           return res.json({  totalAmount , totalCount , firstDate ,lastDate })


        } catch (err) {
            console.error("Error ", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

function getMonthlysummary(getDataBase){
   
    return async function monthlySummary(req, res) {

        try {

            const db = getDataBase();
            const id = req.user.userId;

            const userId = new ObjectId(id);

            const summary = await db.collection('expense').aggregate([
                { $match: { userId } },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                        total: { $sum: '$amount' }
                    }
                }, { $sort: { _id: -1 } }
            ]).toArray();

            res.json(summary.map(item => ({ month: item._id, total: item.total })));

        } catch (err) {
            console.error("Error ", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = {getSummaryEachExpense , getExpenseStatus , getMonthlysummary };