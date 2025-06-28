
const {ObjectId} = require('mongodb');

function addExpenseHandler(getDataBase) {
    return async function addExpense(req, res) {

        try {

            const db = getDataBase();
            const { name, amount, category, date , paymentType , comments } = req.body;
            const  userId = req.user.userId;

            if ( !name || !amount || !category || !date || !paymentType) {
               return res.status(400).send("All fields are required");
            }

            const expense = {
                userId: new ObjectId(userId),
                name,
                amount: parseFloat(amount),
                category,
                paymentType,
                comments,
                date: new Date(date)
            }

            await db.collection('expense').insertOne(expense);
           res.status(200).json({ message: "Expense added successfully" });

        } catch (err) {
            console.error("Error ", err);
            return res.status(500).send("Internal server error");
        }

    }
}


function getExpenseHandler(getDataBase) {
    return async function getExpense(req, res) {

        try {

            const db = getDataBase();
            const userId = req.user.userId;

            if(!userId){
               return res.status(400).send("User ID required");
            }

            const expense = await db.collection('expense').find( { userId: new ObjectId(userId) } ).sort( {date : -1} ).toArray();
            return res.json(expense);

        } catch (err) {
            console.error("Error ", err);
             return res.status(500).send("Internal server error");
        }

    }
}


function deleteExpenseHandler(getDataBase) {
    return async function deleteExpense(req, res) {

        try {

            const db = getDataBase();
            const expenseId = req.query.id
            const userId = req.user.userId;

             if (!userId || !expenseId) {
                return res.status(400).send("User ID and Expense ID are required");
            }

            const result = await db.collection('expense').deleteOne( { userId: new ObjectId(userId) , _id : new ObjectId(expenseId) });
           
            if(result.deletedCount === 0){
               return res.send("Expense Not Found");
            } else {
               return res.status(200).json({ message: "Expense Deleted successfully" });
            }

        } catch (err) {
            console.error("Error ", err);
             return res.status(500).send("Internal server error");
        }

    }
}


function updateExpenseHandler(getDataBase) {
  return async function updateExpense(req, res) {
    try {
      const db = getDataBase();
      const userId = new ObjectId(req.user.userId);
      const expenseId = req.query.id;  
      if (!ObjectId.isValid(expenseId)) {
        return res.status(400).send("Invalid expense ID");
      }

      const { name, amount, category, date, paymentType, comments } = req.body;

      if (!name || !amount || !category || !date || !paymentType) {
        return res.status(400).send("All fields are required");
      }

      const updateDoc = {
        $set: {
          name,
          amount: parseFloat(amount),
          category,
          paymentType,
          comments: comments || "",
          date: new Date(date)
        }
      };

      const result = await db.collection('expense').updateOne(
        { _id: new ObjectId(expenseId), userId },
        updateDoc
      );

      if (result.matchedCount === 0) {
        return res.status(404).send("Expense not found or not authorized");
      }

   return res.status(200).json({ message: "Expense updated successfully" });

    } catch (err) {
      console.error("Error updating expense:", err);
      return res.status(500).send("Internal server error");
    }
  }
}

module.exports = {  addExpenseHandler , getExpenseHandler , deleteExpenseHandler , updateExpenseHandler }