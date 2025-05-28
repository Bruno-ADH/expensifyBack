const jwt = require('jsonwebtoken');
const config = require("../config/jwtconfig");

const tokenCheck = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];
    const { query } = req.query;

    if (!token){ 
        return res.status(401).json({ message: 'Accès refusé, token manquant' });
    }
    
    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expiré, veuillez vous reconnecter" });
        }
        res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = { tokenCheck };