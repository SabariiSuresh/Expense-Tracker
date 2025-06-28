
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function registerUserHandler(getDataBase) {

    return async function registerUser(req, res) {
        try {

            const db = getDataBase();
            const { userName, password, name, email } = req.body;

            if (!userName || !password || !name || !email) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const userExist = await db.collection('users').findOne({ userName });

            if (userExist) {
                return res.status(409).json({ message: "Username already exists, please choose a different one" });
            } else {

                const maskedPassword = await bcrypt.hash(password, 10);
                let newUser = {
                    name, userName, password: maskedPassword, email
                };

                await db.collection('users').insertOne(newUser);
                return res.status(201).json({ message: "Registered successfully" });
            }
        } catch (err) {
            console.error("Error ", err);
            return res.status(500).json({ message: "Internal server error" });
        }

    }

}

function loginUsersHandler(getDataBase) {

    return async function loginUsers(req, res) {
        try {

            const db = getDataBase();

            const { userName, password } = req.body

            const user = await db.collection('users').findOne({ userName });

            if (!userName || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }

            if (!user) {
                return res.status(401).json({ message: "Invalid username or password" });
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid username or password" });
            }

            const token = jwt.sign({ userId: user._id, userName: user.userName }, process.env.TOKEN, { expiresIn: '1h' });

            let userData = {
                id: user._id,
                name: user.name,
                userName: user.userName,
                email: user.email, 
                token
            }

            return res.status(200).json({ message: "Login successful", user: userData });


        } catch (err) {
            console.error("Error ", err);
            return res.status(500).json({ message: "Internal server error" });
        }

    }

}



module.exports = { loginUsersHandler, registerUserHandler }