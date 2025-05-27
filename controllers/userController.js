
const UserRepository = require("../repositories/userRepository");
const Token = require('../services/tokenService');
const bcrypt = require("bcryptjs");
const fs = require('fs').promises;
const path = require('path');


const getUserProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await UserRepository.findById(userId).select("-password");
        if (!result) {
            return res.status(404).json({
                success: true,
                message: "Aucun Utilisateur trouvé",
                users: null
            });
        }

        res.status(200).send({
            success: true,
            message: "Utilisateur recuperé avec success",
            user: result
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Erreur de récuperation de l'utilisateur",
            error: error.message
        });
    }
};


const updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, email, phone, password } = req.body;
    try {
        const user = await UserRepository.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Aucun Utilisateur trouvé" });
        }

        if (!firstName && !lastName && !email && !phone && !password) {
            return res.status(400).json({ message: "Aucune information à mettre à jour" });
        }

        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).json({ message: "L'email est déjà utilisé par un autre utilisateur" });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.phone = phone || user.phone;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        const updateUser = await UserRepository.saveUser(user);
        res.status(200).send({
            success: true,
            message: "modification éffectués avec success",
            token: Token.generateToken(updateUser),
            user: { _id: updateUser._id, firstName: updateUser.firstName, lastName: updateUser.lastName, email: updateUser.email, phone: updateUser.phone, role: updateUser.roleName, avatar: updateUser.avatar }
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Erreur de modification",
            error: error.message,
        });
    }
};


const updateUserAvatar = async (req, res) => {
    const { id } = req.user;
    const userId = id;

    try {
        const user = await UserRepository.findById(userId);
        if (!user) {
            return res.status(404).json("Utilisateur non trouvé");
        }

        if (!req.file) {
            return res.status(400).json("Aucun fichier d'avatar fourni");
        }

        if (user.avatar !== 'user-image.png') {
            try {
                const oldAvatarPath = path.join(__dirname, '..' , 'upload', user.avatar);
                await fs.unlink(oldAvatarPath);
            } catch (err) {
                console.error("Erreur lors de la suppression de l'ancien avatar :", err.message);
                return res.status(500).json({
                    success: false,
                    message: "Erreur lors de la suppression de l'ancien avatar",
                    error: err.message
                });
            }
        }

        user.avatar = req.file.filename;

        await UserRepository.saveUser(user);
        res.status(200).json({
            success: true,
            message: "Avatar mis à jour avec succès",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la mise à jour de l'avatar",
            error: error.message
        });
    }
};

module.exports = { getUserProfile, updateUserProfile, updateUserAvatar };