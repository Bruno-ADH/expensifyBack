const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler.js');
const logger = require('./middleware/logger.js');
const path = require('path');
const requestId = require("./middleware/requestId");
const categoryRoutes = require("./routes/category.routes");
const expenseRoutes = require('./routes/expense.routes');
const statsRoutes = require('./routes/stats.routes');
const jwt = require("jsonwebtoken");
const http = require('http');
const { Server } = require('socket.io');
const configureSocket = require('./socket/index.js');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['*'],
    },
});

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000', // URL de ton frontend
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     allowedHeaders: ['Accept', 'Content-Type'], // Autoriser les headers spécifiques
//   },
// });

connectDB();

app.use(requestId);
app.use(logger);

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/uploads', express.static('uploads')); // Rendre les fichiers accessibles

app.use('/api/v1/authenticate', authRoutes);

app.use('/api/v1/users', userRoutes);

app.use("/api/v1/categories", categoryRoutes);

app.use('/api/v1/expenses', expenseRoutes);

app.use('/api/v1/stats', statsRoutes);


app.get("/", (req, res) => {
    res.json({ message: "Bienvenue sur Expensify !" });
});

configureSocket(io);

app.set('io', io);

app.use((req, res, next) => {
    res.status(404).json({
        name: "NotFound",
        success: false,
        message: `La ressource demandée (${req.originalUrl}) est introuvable.`
    });
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Serveur démarré sur http://127.0.0.1:${PORT}`));

