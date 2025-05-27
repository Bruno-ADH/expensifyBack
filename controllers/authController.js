
const UserRepository = require("../repositories/userRepository");
const Token = require('../services/tokenService');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const EmailService = require("../services/emailservice");



// @desc Inscription de nouvelle user
// @route POST /api/authenticate/register
// @access Public
const register = async (req, res) => {
   try {
      const { firstName, lastName, email, phone, password } = req.body;

      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
         return res.status(400).json({ message: "L'utilisateur existe déjà." });
      }
      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer un nouvel utilisateur
      const newUser = await UserRepository.createUser({
         firstName,
         lastName,
         email,
         phone,
         password: hashedPassword
      });
      res.status(200).send({
         success: true,
         message: "Inscription réussie, En attente d'approbation !",
         token: Token.generateToken(newUser), // Générer un token JWT et envoie
         user: {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.roleName,
            avatar: newUser.avatar
         }
      });

      await EmailService.sendWelcomeEmail(firstName, lastName, email); // Envoi du mail après création

   } catch (error) {
      res.status(500).send({
         success: false,
         message: "Erreur d'inscription",
         error: error.message, // Retourne le message d'erreur
      });
   }
};


// @desc Connexion user
// @route POST /api/authenticate/login
// @access Public
const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      // Vérifier si l'utilisateur existe
      const user = await UserRepository.findByEmail(email);
      if (!user) {
         return res.status(400).json({ message: "Email ou Mot de passe incorrect." });
      }
      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: "Email ou Mot de passe incorrect." });
      }

      //reponse
      res.status(200).json({
         success: true,
         message: "Connexion réussie !",
         token: Token.generateToken(user), // Générer un token JWT
         user: {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.roleName,
            avatar: newUser.avatar
         }
      });

   } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error });
   }
};


// @desc Get user profile
// @route POST /api/authenticate/Profile
// @access Private (Requiert le JWT, pas de role)
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
         message: "L'utilisateur recuperer avec success",
         user: result
      });
   } catch (error) {
      res.status(500).send({
         success: false,
         message: "Erreur de récuperation de l'utilisateur",
         error: error.message // Retourne le message d'erreur
      });
   }
};

// @desc Update user profile
// @route PUT /api/authenticate/Profile
// @access Private (Requiert le JWT, pas de role)
const updateUserProfile = async (req, res) => {
   const userId = req.user.id;
   //const updateUser = req.body;
   try {
      const user = await UserRepository.findById(userId);
      if (!user) {
         return res.status(404).json({ message: "Aucun Utilisateur trouvé" });
      }
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.avatar = req.body.avatar || user.avatar;

      if (req.body.password) {
         // Hasher le mot de passe
         user.password = await bcrypt.hash(req.body.password, 10);
      }
      const updateUser = await UserRepository.saveUser(user);
      res.status(200).send({
         success: true,
         message: "modification éffectués avec success",
         token: Token.generateToken(updateUser), // Générer un token JWT
         user: { _id: updateUser._id, firstName: updateUser.firstName, lastName: updateUser.lastName, email: updateUser.email, phone: updateUser.phone, role: updateUser.roleName, avatar: updateUser.avatar }
      });

   } catch (error) {
      res.status(500).send({
         success: false,
         message: "Erreur de modification",
         error: error.message, // Retourne le message d'erreur
      });
   }
};

// @desc Upload image
// @route POST /api/authenticate/upload-image
// @access Public
const imageUpload = async (req, res) => {
   if (!req.file) {
      return res.status(400).json({ message: "Pas d'image à téléverser" });
   }
   const imageUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;

   res.status(200).json({ imageUrl });
};

module.exports = { register, login, getUserProfile, updateUserProfile, imageUpload };