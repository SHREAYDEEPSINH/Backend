const express = require("express");
const UserModel = require("../models/userModel");
const dashboardRouter = express.Router()
const path = require("path")
const fs = require("fs");
const passport = require("../config/passport-local");
var nodemailer = require("nodemailer");
const CategoryModel = require("../models/CategoryModel");
const SubCategoryModel = require("../models/SubCategoryModel");
const ExtraCategoryModel = require("../models/ExtraCategoryModel");
const ProductModel = require("../models/ProductModel");
const SubProductModel = require("../models/subProductModel");
const ExtraProductModel = require("../models/ExtraProductModel");


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


dashboardRouter.post('/login',
    passport.authenticate('local', { failureRedirect: '/' }),
    function (req, res) {
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



// category 

dashboardRouter.get("/addCategory", (req, res) => {
    res.render("addCategory")
})

dashboardRouter.post("/insertCategory", async (req, res) => {
    try {
        await CategoryModel.create(req.body)
        res.redirect("/dashboard")
    } catch (error) {
        console.log(error)
    }
})

dashboardRouter.get("/viewCategory", async (req, res) => {
    const category = await CategoryModel.find({})
    res.render("viewCategory", { category })
})


// subCategory 

dashboardRouter.get("/addSubCategory", async (req, res) => {
    const category = await CategoryModel.find({})
    res.render("addSubCategory", { category })
})

dashboardRouter.post("/insertSubCategory", async (req, res) => {
    await SubCategoryModel.create(req.body)
    res.redirect("/dashboard")
})

dashboardRouter.get("/viewSubCategory" , async (req,res)=>{
    const subCategory = await SubCategoryModel.find().populate("categoryId").exec();
    res.render("viewSubCategory" , {subCategory:subCategory})
})


// extraCategory 

dashboardRouter.get("/addExtraCategory", async (req, res) => {
    const category = await CategoryModel.find({})
    const subCategory = await SubCategoryModel.find({})
    res.render("addExtraCategory", { category:category , subCategory:subCategory })
})

dashboardRouter.post("/insertExtraCategory", async (req, res) => {
    await ExtraCategoryModel.create(req.body)
    res.redirect("/dashboard")
})

dashboardRouter.get("/viewExtraCategory", async (req, res) => {
    const extraCategory = await ExtraCategoryModel.find().populate("categoryId").populate("subCategoryId").exec();
    res.render("viewExtraCategory" , {extraCategory})
})






// Product 

dashboardRouter.get("/addProduct", (req, res) => {
    res.render("addProduct")
})

dashboardRouter.post("/insertProduct", async (req, res) => {
    try {
        await ProductModel.create(req.body)
        res.redirect("/dashboard")
    } catch (error) {
        console.log(error)
    }
})

dashboardRouter.get("/viewProduct", async (req, res) => {
    const product = await ProductModel.find({})
    res.render("viewProduct", { product })
})


// subProduct 

dashboardRouter.get("/addSubProduct", async (req, res) => {
    const product = await ProductModel.find({})
    res.render("addSubProduct", { product })
})

dashboardRouter.post("/insertSubProduct", async (req, res) => {
    await SubProductModel.create(req.body)
    res.redirect("/dashboard")
})

dashboardRouter.get("/viewSubProduct" , async (req,res)=>{
    const subProduct = await SubProductModel.find().populate("productId").exec();
    res.render("viewSubProduct" , {subProduct:subProduct})
})


// extraProduct 

dashboardRouter.get("/addExtraProduct", async (req, res) => {
    const product = await ProductModel.find({})
    const subProduct = await SubProductModel.find({})
    res.render("addExtraProduct", { product:product , subProduct:subProduct })
})

dashboardRouter.post("/insertExtraProduct", async (req, res) => {
    await ExtraProductModel.create(req.body)
    res.redirect("/dashboard")
})

dashboardRouter.get("/viewExtraProduct", async (req, res) => {
    const extraProduct = await ExtraProductModel.find().populate("productId").populate("subProductId").exec();
    res.render("viewExtraProduct" , {extraProduct})
})

module.exports = dashboardRouter;