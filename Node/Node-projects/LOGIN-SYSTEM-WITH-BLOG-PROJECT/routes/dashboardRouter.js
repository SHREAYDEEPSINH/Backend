const express = require("express");
const UserModel = require("../models/userModel");
const dashboardRouter = express.Router()
const path = require("path")
const fs = require("fs");
const passport = require("../config/passport-local");
var nodemailer = require("nodemailer");


dashboardRouter.get("/", (req, res) => {
    res.render("signin")
})

dashboardRouter.get("/dashboard", (req, res) => {

    res.render("dashboard")
})

dashboardRouter.get("/signup", (req, res) => {
    res.render("signup")
})

dashboardRouter.post("/insertData", UserModel.imageUpload, async (req, res) => {
    // console.log(req.body)

    try {
        if (req.file) {
            req.body.image = UserModel.imagePath + "/" + req.file.filename;
        }
        await UserModel.create(req.body);
        console.log("user created")
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})


dashboardRouter.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/dashboard');
});


dashboardRouter.get("/tables", passport.isAuth, async (req, res) => {
    const userData = await UserModel.find({})
    res.render("tables", { userData });
});

dashboardRouter.get("/changePassword", (req, res) => {
    res.render("changePassword");
});

dashboardRouter.post("/getChangePassword", async (req, res) => {

    // console.log(res.locals.user, "localUser")
    const id = res.locals.user._id
    const userData = await UserModel.findById(id)
    console.log(userData)
    if (req.body.oldPassword === userData.password) {
        if (req.body.newPassword !== req.body.oldPassword) {
            if (req.body.confirmPassword === req.body.newPassword) {
                await UserModel.findByIdAndUpdate(userData._id, { password: req.body.newPassword })
                await res.redirect("/");
            } else {
                res.redirect("back")
            }
        } else {
            res.redirect("back")
        }
    } else {
        res.redirect("back")
    }
});


dashboardRouter.get("/logout", (req, res) => {
    req.session.destroy(function (err) { });
    res.redirect("/");
});


dashboardRouter.post("/forgotPassword", async (req, res) => {
    try {
        let getUser = await UserModel.findOne({ email: req.body.email });
        if (!getUser) {
            return res.redirect("/");
        }

        let otp = Math.floor(Math.random() * 10000);

        res.cookie("getOtp", otp);

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "shreaydeepsinhvaghela@gmail.com",
                pass: "zbcj qigh jkzt oseg",
            },
        });

        var mailOptions = {
            from: "shreaydeepsinhvaghela@gmail.com",
            to: getUser.email,
            subject: "OTP",
            text: `OTP -${otp}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
                res.redirect("/otpPage");
            }
        });
    } catch (err) {
        console.log(err);
    }
});

dashboardRouter.get("/otpPage", (req, res) => {
    res.render("otp");
});

dashboardRouter.get("/forgotPasswordPage", (req, res) => {
    res.render("forgotPassword")
})

dashboardRouter.post("/getNewPasswore", async (req, res) => {
    console.log(req.body)
    const userData = await UserModel.findById(_id)
    console.log(userData)
    // if(req.body.confirmPassword === req.body.newPassword){

    // }

})

dashboardRouter.post("/checkOtp", (req, res) => {
    const cookieOtp = req.cookies["getOtp"];

    if (cookieOtp === req.body.otp) {
        res.redirect("/forgotPasswordPage")
    }
});

module.exports = dashboardRouter;