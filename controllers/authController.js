
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
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserRepository.createUser({
         firstName,
         lastName,
         email,
         phone,
         password: hashedPassword
      });
      res.status(200).send({
         success: true,
         message: "Inscription réussie !",
         token: Token.generateToken(newUser),
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

      await EmailService.sendWelcomeEmail(firstName, lastName, email);

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

      const user = await UserRepository.findByEmail(email);
      if (!user) {
         return res.status(400).json({ message: "Email ou Mot de passe incorrect." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: "Email ou Mot de passe incorrect." });
      }

      res.status(200).json({
         success: true,
         message: "Connexion réussie !",
         token: Token.generateToken(user), 
         user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.roleName,
            avatar: user.avatar
         }
      });

   } catch (error) {
      console.error("Erreur de connexion :", error.message);
      res.status(500).json({ message: "Erreur serveur", error: error });
   }
};

module.exports = { register, login };