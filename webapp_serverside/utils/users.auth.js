const passport = require("passport");
const usersRepo = require("./users.repository.js");

module.exports = {
  initializeAuthentications(app) {
    app.use(passport.initialize());
    app.use(passport.authenticate("session"));

    passport.serializeUser((userFromDb, doneFunction) => {
      const userObj = {
        id: userFromDb.ID_user, // Assurez-vous que ces champs correspondent à votre structure utilisateur
        name: userFromDb.Username,
        role: userFromDb.Role || "user", // Remplacez "Role" si différent
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
};
