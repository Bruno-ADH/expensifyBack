const express = require("express");
const router = express.Router();
const authentificate = require("../controllers/authController");
const { registerSchema, loginSchema } = require("../services/authValideService");

router.post("/register", registerSchema, authentificate.register);

router.post("/login", loginSchema, authentificate.login);

module.exports = router;