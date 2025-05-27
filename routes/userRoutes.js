const express = require("express");
const router = express.Router();
const { tokenCheck } = require("../middleware/authMiddleware");
const { roleCheck } = require("../middleware/roleMiddleware");
const { registerSchema } = require("../services/authValideService");
const controllersUsers = require("../controllers/userController");

//Les routes pour (admin uniquement)

// Liste des utilisateurs 
router.get('/listes', tokenCheck, roleCheck(['admin']), controllersUsers.getAllUsers);

//recuperer les uniquement les Utilisateurs et les stats
router.get("/all-users", tokenCheck, roleCheck(['admin']),  controllersUsers.getAllMembers);

// Récuperer un utilisateur
router.get("/:userId", tokenCheck, roleCheck(['admin']), controllersUsers.getOneUser);

// Modifier des utilisateurs
router.patch("/:id", tokenCheck, roleCheck(['admin']), controllersUsers.updateUser);

// Supprimer des utilisateurs
router.delete("/delete/:userId", tokenCheck, roleCheck(['admin']), controllersUsers.deleteUser);

module.exports = router;