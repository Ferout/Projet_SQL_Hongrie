const express = require('express');
const router = express.Router();
const userRepo = require("../utils/users.repository");

// Endpoint pour l'authentification
router.post("/login", async (request, response) => {
  console.log("POST /auth/login called");
  console.log("Request body received:", request.body);

  const { username, password } = request.body;

  // Vérifiez si les champs requis sont présents
  if (!username || !password) {
    console.warn("Missing username or password");
    return response.status(400).json({ message: "Username and password are required." });
  }

  try {
    // Log avant vérification des identifiants
    console.log(`Validating credentials for username: ${username}`);

    // Vérification des identifiants
    const areValid = await userRepo.areValidCredentials(username, password);
    console.log("Are credentials valid?", areValid);

    if (!areValid) {
      console.warn(`Invalid credentials for username: ${username}`);
      return response.status(401).json({ message: "Identifiants invalides" });
    }

    // Récupérer l'utilisateur si les identifiants sont valides
    console.log(`Fetching user details for username: ${username}`);
    const user = await userRepo.getOneUser(username);

    if (!user) {
      console.warn(`User not found for username: ${username}`);
      return response.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si l'utilisateur est administrateur
    console.log(`Checking if user ${username} is admin`);
    const isAdmin = await userRepo.getUserIsAdmin(username);
    console.log(`Is user ${username} admin?`, isAdmin);

    // Ajouter l'utilisateur à la session pour les futures requêtes
    request.session.user = { ...user, isAdmin };

    return response.status(200).json({
      message: "Connexion réussie",
      user,
      isAdmin
    });
  } catch (err) {
    // Log en cas d'erreur inattendue
    console.error("Erreur lors du traitement :", err);
    return response.status(500).json({ message: "Erreur interne du serveur", error: err.message });
  }
});

// Endpoint pour vérifier si un utilisateur est admin
router.get("/is-admin/:username", async (req, res) => {
  const { username } = req.params;

  if (!username) {
    console.warn("Username is missing in /is-admin request");
    return res.status(400).json({ message: "Username is required." });
  }

  console.log("GET /auth/is-admin called for username:", username);

  try {
    const isAdmin = await userRepo.getUserIsAdmin(username);

    if (isAdmin === null) {
      console.warn(`User not found: ${username}`);
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ username, isAdmin });
  } catch (err) {
    console.error("Error fetching IsAdmin:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Endpoint pour récupérer l'utilisateur actuel
router.get("/current-user", (req, res) => {
  console.log("GET /auth/current-user called");

  if (!req.session || !req.session.user) {
    console.warn("No user session found.");
    return res.status(401).json({ message: "No user logged in" });
  }

  console.log("Current user session:", req.session.user);
  return res.json({ user: req.session.user });
});

// Endpoint pour la déconnexion
router.get("/logout", (request, response) => {
  console.log("GET /auth/logout called");

  if (request.session) {
    request.session.destroy((err) => {
      if (err) {
        console.error("Error during logout:", err);
        return response.status(500).json({ message: "Erreur lors de la déconnexion", error: err.message });
      }

      response.clearCookie("connect.sid"); // Clear session cookie
      response.json({ message: "Déconnexion réussie" });
    });
  } else {
    response.status(400).json({ message: "No active session to log out" });
  }
});

module.exports = router;
