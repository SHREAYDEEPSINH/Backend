const express = require("express");
const UserModel = require("../model/UserModel");
const passport = require("../config/passport-local");
const CategoryModel = require("../model/CategoryModel");
const SubCategoryModel = require("../model/SubCategory");
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


dashboardRouter.get("/addCategory", (req, res) => {
    res.render("addCategory");
})


dashboardRouter.post("/insertCategory", async (req, res) => {
    try {
        console.log(req.body);
        await CategoryModel.create(req.body);
        console.log("Category created");
        res.redirect("/dashboard");
      } catch (err) {
        console.log(err);
      }
})

dashboardRouter.get("/viewCategory", async (req, res) => {
    try {
      const categories = await CategoryModel.find({});
      res.render("viewCategory", { categories });
    } catch (err) {
      console.log(err);
    }
  });
  
  dashboardRouter.get("/addSubCategory", async (req, res) => {
    try {
      const categories = await CategoryModel.find({});
      res.render("addSubCategory", { categories: categories });
    } catch (err) {
      console.log(err);
    }
  });
  
  dashboardRouter.post("/insertSubCategory", async (req, res) => {
    try {
      await SubCategoryModel.create(req.body);
      console.log("Subcategory created");
    } catch (err) {
      console.log(err);
    }
  });

module.exports = dashboardRouter;