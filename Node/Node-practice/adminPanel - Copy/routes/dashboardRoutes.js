const express = require("express");
const UserModel = require("../model/UserModel");
const passport = require("../config/passport-local");
const dashboardRouter = express.Router()


dashboardRouter.get("/", async (req, res) => {
    res.render("singIn");
})


dashboardRouter.get("/singUp", (req, res) => {
    res.render("singUp")
})

dashboardRouter.get("/dashboard", passport.isAuth, (req, res) => {
    res.render("dashboard")
})

dashboardRouter.get("/table", async (req, res) => {
    const userData = await UserModel.find({})
    res.render("table", { userData })
})


dashboardRouter.post("/insertData", UserModel.imageUpload, async (req, res) => {
    try {
        if (req.file) {
            req.body.profileImage = UserModel.imagePath + "/" + req.file.filename;
        }
        await UserModel.create(req.body);
        console.log("user created")
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }

})


dashboardRouter.get("/changepassword", (req, res) => {
    res.render("changepassword")
})

dashboardRouter.post("/newpassword", async (req, res) => {
    const cookieData = req.cookies["auth"];
    if (!cookieData) {
        res.redirect("/");
        return;
    } else {
        if (req.body.oldpassword === cookieData.password) {
            if (req.body.newpassword !== req.body.oldpassword) {
                if (req.body.confirmpassword === req.body.newpassword) {
                    console.log(cookieData._id);
                    await UserModel.findByIdAndUpdate(cookieData._id, { password: req.body.newpassword })
                    console.log("password changed")
                    await res.clearCookie("auth");
                    await res.redirect("/");
                } else { res.redirect("back") }
            } else { res.redirect("back") }
        } else { res.redirect("back") }
    }
})


dashboardRouter.get("/logOut", (req, res) => {
    req.session.destroy(function (err) {
        // cannot access session here
        // console.log(err);
    });
    res.redirect("/")
})


dashboardRouter.post("/logIn", passport.authenticate("local", { failureRedirect: "/" }), (req, res) => {
    return res.redirect("/dashboard")

})



module.exports = dashboardRouter;