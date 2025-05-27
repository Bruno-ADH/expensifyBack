const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { tokenCheck } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/profile", tokenCheck, userController.getUserProfile);

router.put("/profile", tokenCheck, userController.updateUserProfile);

router.put("/avatar", tokenCheck, upload.single('avatar'), userController.updateUserAvatar);

module.exports = router;