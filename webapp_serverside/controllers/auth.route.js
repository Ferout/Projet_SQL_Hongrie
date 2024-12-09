const express = require('express');
const router = express.Router();
const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

// Endpoints
router.post("/login", loginPostAction);
router.get("/logout", logoutAction);

// Vérifie les identifiants et connecte l'utilisateur
async function loginPostAction(request, response) {
  const { username, userpass } = request.body;

  try {
    // Vérification des identifiants
    const areValid = await userRepo.areValidCredentials(username, userpass);

    if (areValid) {
      // Récupérer l'utilisateur si les identifiants sont valides
      const user = await userRepo.getOneUser(username);
      request.login(user, (err) => {
        if (err) {
          console.error("Erreur lors de la connexion :", err);
          return response.status(500).send({ message: "Connexion échouée", error: err });
        }
        // Réponse en cas de connexion réussie
        response.send({ message: "Connexion réussie", user });
      });
    } else {
      // Réponse en cas d'échec
      response.status(401).send({ message: "Connexion échouée : Identifiants invalides" });
    }
  } catch (err) {
    console.error("Erreur lors du traitement :", err);
    response.status(500).send({ message: "Erreur interne du serveur", error: err });
  }
}

// Déconnecte l'utilisateur
function logoutAction(request, response) {
  request.logout((err) => {
    if (err) {
      console.error("Erreur lors de la déconnexion :", err);
      return response.status(500).send({ message: "Déconnexion échouée", error: err });
    }
    response.send({ message: "Déconnexion réussie" });
  });
}

module.exports = router;
