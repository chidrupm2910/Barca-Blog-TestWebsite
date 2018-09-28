var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});




//show register form
router.get("/register",function(req,res){
    res.render("register");
});

//Handle Sign Up
router.post("/register",function(req,res){
   var newUser= new User({username: req.body.username});
   User.register(newUser,req.body.password,function(err,user){
       if(err){
           
           console.log(err);
           req.flash("error", err.message);
           return res.render("register");
       }
      
     passport.authenticate("local")(req,res,function(){
         req.flash("success", "Welcome"+ user.username);
          res.redirect("/campgrounds");
      });
   });
});

//Login Routes
router.get("/login",function(req,res){
    res.render("login");
});

//Handling Login Logic
router.post("/login",passport.authenticate("local",
     {
         successRedirect: "/campgrounds",
         failureRedirect: "/login"
     }),function(req,res){
});
//Logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
});


module.exports= router;