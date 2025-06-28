const jwt = require('jsonwebtoken');
const secretToken = process.env.TOKEN;

function verifyingSecretToken(req , res , next){
    const authenticateHeader = req.headers['authorization'];
    const token = authenticateHeader && authenticateHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify( token , secretToken , (err , user)=> {
        if(err){
             console.error("JWT verification error:", err);
            return res.status(403).json({ message: "Invalid or expired token" });
        } else {
            req.user = user;
            next();
        }
    })
}

module.exports = verifyingSecretToken;