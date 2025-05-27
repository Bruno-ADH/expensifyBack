const express = require("express");
const router = express.Router();
const authentificate = require("../controllers/authController");
const { registerSchema, loginSchema } = require("../services/authValideService");
const { tokenCheck } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", registerSchema, authentificate.register);

router.post("/login", loginSchema, authentificate.login);

module.exports = router;