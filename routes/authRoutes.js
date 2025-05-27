const express = require("express");
const router = express.Router();
const authentificate = require("../controllers/authController");
const { registerSchema, loginSchema } = require("../services/authValideService");
const { tokenCheck } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");


//inscription
router.post("/register", registerSchema, authentificate.register);
//connexion
router.post("/login", loginSchema, authentificate.login);
// 
router.get("/profile", tokenCheck, authentificate.getUserProfile); //Get User Profil

router.put("/profile", tokenCheck, authentificate.updateUserProfile); //Update User Profile

router.post("/upload-image", upload.single('image'), authentificate.imageUpload);

module.exports = router;