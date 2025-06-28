
const { ObjectId } = require('mongodb');

function getUserProfileHandler(getDataBase) {

    return async function getUserProfile(req, res) {
        try {

            const db = getDataBase();
            const userId = req.user.userId;

            const user = await db.collection('users').findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } })

            if (!user) {
                return res.status(400).send("User not found");
            } else {
                res.send(user);
            }

        } catch (err) {
            console.error("Error ", err);
            return res.status(500).send("Internal server error");
        }

    }

}


function updateUserProfileHaldler(getDataBase) {

    return async function updateUserProfile(req, res) {

        try {
            const db = getDataBase();
            const userId = req.user.userId;
            const { name, userName, email } = req.body;

            const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

            if (!user) {
                return res.status(400).send("User not found");
            }

            if (!userName || !name) {
                return res.status(400).send("User Name and Name is required ");
            }

            const existingUser = await db.collection('users').findOne({ userName });
            if (existingUser) {
                return res.status(409).json({ message: "Sorry Username already taken" });
            } else {

                await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: { userName, name, email } });
                res.status(200).json({ message: "Profile updated successfully" });

            }

        } catch (err) {
            console.error("Error ", err);
            return res.status(500).send("Internal server error");
        }
    }


}


module.exports = { getUserProfileHandler, updateUserProfileHaldler };