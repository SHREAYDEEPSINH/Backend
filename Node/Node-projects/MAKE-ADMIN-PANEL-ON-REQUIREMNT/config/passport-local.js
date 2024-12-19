const passport = require("passport");
const UserModel = require("../models/userModel");


const PassportStrategy =require("passport-local").Strategy;

passport.use(
  new PassportStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      const getUserData = await UserModel.findOne({ username: username });
      // console.log(getUserData);
      if (getUserData) {
        if (getUserData.password == password) {
          return done(null, getUserData);
        } else {
          return done(null, false);
        }
      } else {
        return done(null, false);
      }
    }
  )
);


passport.serializeUser(async (user, done) => {
  const userData = await UserModel.findById(user.id);

  if (userData) {
    return done(null, userData.id);
  } else {
    return done(null, false);
  }
});

passport.deserializeUser(async (id, done) => {
  const userData = await UserModel.findById(id);

  if (userData) {
    return done(null, userData);
  } else {
    return done(null, false);
  }
});

passport.isAuth = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/");
  }
};

passport.setUser = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

  module.exports = passport