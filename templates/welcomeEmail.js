exports.welcomeTemplate = (firstName, lastName, email) => `
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <title>Bienvenue sur Expensify</title>
  </head>
  <body style="font-family: 'Poppins', sans-serif; background-color: #F9FAFB; color: #1E293B; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 30px 40px; text-align: center;">
      <h2 style="color: #4CAF50; font-weight: 600; margin-bottom: 16px;">Bienvenue sur Expensify, ${firstName} ${lastName} !</h2>
      <p style="font-weight: 400; font-size: 16px; line-height: 1.5; margin: 10px 0;">Votre compte a été créé avec succès.</p>
      <p style="font-weight: 400; font-size: 16px; line-height: 1.5; margin: 10px 0;">Voici vos informations :</p>
      <p style="font-weight: 600; color: #1E293B; font-size: 16px; line-height: 1.5; margin: 10px 0;">
        Email : ${email}
      </p>
      <p style="font-weight: 400; font-size: 16px; line-height: 1.5; margin: 10px 0;">Vous pouvez vous connecter dès maintenant en cliquant sur le bouton ci-dessous :</p>
      <a href="http://localhost:5500/pages/index" target="_blank" rel="noopener noreferrer"
         style="display: inline-block; margin-top: 25px; background-color: #4CAF50; color: white !important; padding: 14px 28px; font-weight: 600; text-decoration: none; border-radius: 30px; box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);">
        Se connecter
      </a>
      <div style="margin-top: 40px; font-size: 13px; color: #94A3B8;">
        <p>© 2025 Expensify. Tous droits réservés.</p>
      </div>
    </div>
  </body>
</html>
`;