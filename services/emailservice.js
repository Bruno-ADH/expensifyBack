const transporter = require("../config/emailconfig");
const { welcomeTemplate } = require("../templates/welcomeEmail");

exports.sendWelcomeEmail = async (firstName, lastName, email) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Bienvenue sur notre plateforme !",
            html: welcomeTemplate(firstName, lastName, email)
        });
        console.log("Email envoyé avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
    }
};