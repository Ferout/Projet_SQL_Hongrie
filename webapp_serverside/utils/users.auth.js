const jwt = require("jsonwebtoken");
const passport = require("passport");
const usersRepo = require("./users.repository.js");

const SECRET_KEY = "SuperSecretRandomString"; // Remplacez par une clé robuste

module.exports = {
  initializeAuthentications(app) {
    app.use(passport.initialize());
    app.use(passport.authenticate("session"));

    passport.serializeUser((userFromDb, doneFunction) => {
      const userObj = {
        id: userFromDb.ID_user,
        name: userFromDb.Username,
        role: userFromDb.IsAdmin ? "admin" : "user",
      };
      doneFunction(null, userObj);
    });

    passport.deserializeUser(async (userObj, doneFunction) => {
      try {
        const userFromDb = await usersRepo.getOneUser(userObj.name);
        doneFunction(null, userFromDb);
      } catch (err) {
        doneFunction(err, null);
      }
    });
  },

  generateToken(user) {
    return jwt.sign(
      { id: user.ID_user, username: user.Username, isAdmin: user.IsAdmin },
      SECRET_KEY,
      { expiresIn: "1d" } // Expiration : 1 jour
    );
  },

  verifyToken(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  },
};