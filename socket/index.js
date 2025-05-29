const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

/**
 * @param {Server} io - instance de socket.io
 */
const configureSocket = (io) => {
  io.use((socket, next) => {
    const token =
      socket.handshake.auth?.token || socket.handshake.headers?.token;

    if (!token) {
      return next(new Error("Token manquant"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      socket.join(decoded.id);
      next();
    } catch (error) {
      console.error("Erreur de vérification du token:", error.message);
      return next(new Error("Authentification échouée"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`🟢 Utilisateur connecté: ${socket.id}`);
    console.log(`👩‍💻 User ID (JWT): ${socket.user?.id}`);

    socket.on("disconnect", () => {
      console.log(`🔴 Utilisateur déconnecté: ${socket.id}`);
    });
  });
};

module.exports = configureSocket;
