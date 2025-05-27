const jwt = require('jsonwebtoken');
const config = require("../config/jwtconfig");

const tokenCheck = (req, res, next) => {
     // Récupérer le token dans le header Authorization
    const token = req.header('Authorization')?.split(" ")[1];
    if (!token){ 
        return res.status(401).json({ message: 'Accès refusé, token manquant' });
    }
    
    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, config.secret);
        // Ajouter les infos du user dans req pour les routes protégées
        req.user = decoded;
        // Passer au prochain contrôleur
        next();
        
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expiré, veuillez vous reconnecter" });
        }
        res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = { tokenCheck };