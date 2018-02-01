var authController = require("../controllers/auth_controller.js");
var db = require("../models/index.js");
module.exports = function(app, passport) {
  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.get("/forgot", authController.forgot);
  app.get("/dashboard", isLoggedIn, authController.dashboard);
  app.get("/logout", authController.logout);
  app.get("/" ,logCheck, authController.home);
  
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",

      failureRedirect: "/"
    })
  );
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      
      failureRedirect: "/"
    })
  );
 


  




  function logCheck(req,res,next) {
  if(!req.isAuthenticated()) return next()
  res.redirect("/dashboard")
    
  }
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/");
  }
};
