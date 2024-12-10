const express = require("express");
const router = express.Router();
const userRepo = require("../utils/users.repository");

// Connexion
router.post("/login", async (req, res) => {
  console.log("POST /login called with body:", req.body); // Log initial

  const { username, password } = req.body;

  if (!username || !password) {
    console.warn("Missing username or password");
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const user = await userRepo.getUserByUsernameAndPassword(username, password);
    console.log("User fetched from database:", user); // Log pour vérifier si l'utilisateur existe

    if (!user) {
      console.warn("Invalid credentials for username:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Obtenir le statut `isAdmin` depuis la base de données
    const isAdmin = await userRepo.getIsAdminByUsername(username);
    console.log(`Admin status for user ${username}:`, isAdmin);

    res.status(200).json({ user: { id: user.ID_user, username: user.Username, isAdmin } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Récupérer les informations de l'utilisateur connecté
router.get("/current-user", async (req, res) => {
  const username = req.query.username; // Ajoutez un query paramètre pour identifier l'utilisateur
  console.log("Current user endpoint called with username:", username);

  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }

  try {
    const isAdmin = await userRepo.getIsAdminByUsername(username);
    console.log(`Admin status for user ${username}:`, isAdmin);

    if (isAdmin === null) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user: { username, isAdmin } });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Récupérer le statut d'administrateur d'un utilisateur
router.get("/is-admin/:username", async (req, res) => {
  const { username } = req.params;
  console.log("GET /is-admin called with username:", username);

  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }

  try {
    const isAdmin = await userRepo.getIsAdminByUsername(username);
    console.log(`Admin status for user ${username}:`, isAdmin);

    if (isAdmin === null) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ username, isAdmin });
  } catch (err) {
    console.error("Error fetching admin status:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Déconnexion
router.post("/logout", (req, res) => {
  console.log("POST /logout called");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
