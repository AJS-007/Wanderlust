const express=require("express")
const router= express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport= require("passport")
const { saveRedirectUrl } = require("../middleware.js")
const userController = require("../controllers/users.js")

router.route("/signup")
     .get(userController.renderSignupForm)
//authentication mtlb verifying if my identity login signup 
//authorization batata h ki konse user ko is app peh kis kis chiz ki access hai permissions
     .post(wrapAsync(userController.signup))

     router.route("/login")
// Show Login Form
 
       .get( userController.renderLoginForm)
// Handle Login Logic
       .post(saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), userController.login);

router.get("/logout",userController.logout)

module.exports= router;