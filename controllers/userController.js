const UserRepository = require("../repositories/userRepository");
const EmailService = require("../services/emailservice");
const bcrypt = require("bcryptjs");

// @desc  Get all users (Admin Only)
// @route GET /api/users/listes
// @access Private (Admin)
const getAllUsers = async (req, res) => {
    try {
        // Récupérer les éléments paginés
        const users = await UserRepository.findAllUsers().select("-password");
        // Compter le nombre total d'éléments
        const totalUsers = await UserRepository.countUser();

        res.status(200).send({
            success: true,
            message: "Utilisateurs listes",
            users: users,
            totalUsers
        });

    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};


// @desc  Get all users (Admin Only)
// @route GET /api/users/:userId
// @access Private (Admin)
const getOneUser = async (req, res) => {
    const userId = req.params.userId;
    try{ 
        const result = await UserRepository.findById(userId).select("-password");
        if(!result){
            return res.status(404).json({ 
               success: true,
               message: "Aucun Utilisateur trouvé",
               users: null
           });
        }
        
        res.status(200).send({
            success: true,
            message: "L'utilisateur recuperer avec success",
            user: result
        });
    }catch(error) {
        res.status(500).send({
            success : false,
            message: "Erreur de récuperation de l'utilisateur",
            error: error.message, // Retourne le message d'erreur
        });
    }
};


// @desc  Update users (Admin Only)
// @route PATCH /api/users/:id
// @access Private (Admin)
const updateUser = async (req, res) => {
    const userId = req.params.id;
    //const updateUser = req.body;
    try{
        const user = await UserRepository.findById(userId).select("-password");
        if(!user){
            res.status(404).send({
                success: true,
                message: "L'Utlisateur a modifier n'existe pas... ",
                user: null
            });
        }
        
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;

        const updateUser = await UserRepository.saveUser(user);
        res.status(200).send({
            success: true,
            message: "L'Utlisateur a été modifier avec success",
            user: updateUser
        });
    }catch (error){
        res.status(500).send({
            success: false,
            message: "Erreur de modification du l'Utlisateur",
            error: error.message, // Retourne le message d'erreur
        });
    }
};


// @desc  Delete users (Admin Only)
// @route DELETE /api/users/delete/:userId
// @access Private (Admin)
const deleteUser = async (req, res) => {
    try{
        const user = await UserRepository.findById(req.params.userId);
        if(!user){
          res.status(404).send({
            success: true,
            message: "L'Utlisateur a supprimer n'existe pas... ",
            user: null
          });
        }

        await UserRepository.deleteOneUser(user);
        res.status(200).send({
          success: true,
          message: "L'Utlisateur a été supprimer avec success",
          user: null
        });
    }catch (error){
        res.status(500).send({
            success: false,
            message: "Erreur de suppression de l'Utlisateur",
            error: error.message, // Retourne le message d'erreur
        });
    }
};

// @desc  Get all Member (Admin)
// @route GET /api/users/all-users
// @access Private (Admin)
const getAllMembers = async (req, res) => {
    try {
        
    }catch (error){
        res.status(500).send({
            success: false,
            message: "Erreur de recuperation des utilisateurs",
            error: error.message, // Retourne le message d'erreur
        });
    }
};

module.exports = { 
    getAllUsers,
    getOneUser, 
    updateUser, 
    deleteUser,
    getAllMembers
};