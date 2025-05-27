const express = require ("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config();

connectDB();
app.use(cors());

//middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware pour envoyer des requettes depuis un domaine différent

// process.env.CLIENT_URL ||
// app.use(
//     cors( {
//         origin: "*",
//         methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//         allowedHearders: ["Content-Type", "Authorization"],
//     })
// );

app.use('/uploads', express.static('uploads')); // Rendre les fichiers accessibles

// Routes conexion et inscription
app.use('/api/authenticate', authRoutes);
//Routes pour l'admin et gestions des users
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Serveur démarré sur http://localhost:${PORT}`));

