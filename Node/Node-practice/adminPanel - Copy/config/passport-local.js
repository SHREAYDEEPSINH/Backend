const passport = require("passport");
const UserModel = require("../model/UserModel");
const PassportStrategy = require("passport-local").Strategy;

passport.use(new PassportStrategy({ usernameField:'username'}, async (username, password, done) => {
    console.log(username,password);
    
    const userdata = await UserModel.findOne({ username: username });
    if (userdata) {
        if (userdata.password === password) {
            done(null, userdata);
        } else {
            done(null, false);
        }
    } else {
        done(null, false);
    }

}));

passport.serializeUser(async (user, done) => {
    const userdata = await UserModel.findById(user.id);
    if (userdata) {
        done(null, userdata.id)
    } else {
        done(null, false)
    }

});

passport.deserializeUser(async (id, done) => {
    const userdata = await UserModel.findById(id);
    if (userdata) {
        done(null, userdata)
    } else {
        done(null, false)
    }
});

passport.isAuth = (req,res,next) =>{
    console.log(req.isAuthenticated(),"Boolean");
    
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/");
    }
}

passport.setUser = (req, res, next) => {
    res.locals.user = req.user;
    next();
  };

module.exports = passport;