const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connexion à MongoDB réussi !");
        
    } catch (error) {
        console.error("Erreur lors de la connexion à MongoDB !", error.message);   
        process.exit(1); // Stoppe l'application en cas d'erreur
    }
}

module.exports = connectDB;