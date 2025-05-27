exports.welcomeTemplate = (firstName, lastName, email) => `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Bienvenue sur Expensify</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #F9FAFB;
    color: #1E293B;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
    padding: 30px 40px;
    text-align: center;
  }
  h2 {
    color: #4CAF50;
    font-weight: 600;
    margin-bottom: 16px;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    margin: 10px 0;
  }
  .highlight {
    font-weight: 600;
    color: #1E293B;
  }
  .btn {
    display: inline-block;
    margin-top: 25px;
    background-color: #4CAF50;
    color: white !important;
    padding: 14px 28px;
    font-weight: 600;
    text-decoration: none;
    border-radius: 30px;
    box-shadow: 0 4px 12px rgb(76 175 80 / 0.4);
    transition: background-color 0.3s ease;
  }
  .btn:hover {
    background-color: #3B8E40;
  }
  .footer {
    margin-top: 40px;
    font-size: 13px;
    color: #94A3B8;
  }
</style>
</head>
<body>
  <div class="container">
    <h2>Bienvenue sur Expensify, ${firstName} ${lastName} !</h2>
    <p>Votre compte a été créé avec succès.</p>
    <p>Voici vos informations :</p>
    <p><span class="highlight">Email :</span> ${email}</p>
    <p>Vous pouvez vous connecter dès maintenant en cliquant sur le bouton ci-dessous :</p>
    <a class="btn" href="http://localhost:5500/pages/index" target="_blank" rel="noopener noreferrer">Se connecter</a>

    <div class="footer">
      <p>© 2025 Expensify. Tous droits réservés.</p>
    </div>
  </div>
</body>
</html>

`;