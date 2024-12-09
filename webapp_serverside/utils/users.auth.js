const passport = require("passport");
const usersRepo = require(__dirname + "\\users.repository.js");

module.exports = {
  initializeAuthentications(app) {
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));

    passport.serializeUser(function (userFromDb, doneFunction) { 
      const userObj = { id: userFromDb.user_id, name: userFromDb.user_name, role: userFromDb.user_role };
      doneFunction(null, userObj);
    });

    passport.deserializeUser(async function (userObj, doneFunction) { 
      try {
        const userFromDb = await usersRepo.getOneUser(userObj.name);
        doneFunction(null, userFromDb);
      } catch (err) {
        doneFunction(err, null);
      }
    });
  }
};
