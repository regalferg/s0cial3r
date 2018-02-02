var db = require("../models")
var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('signup');
 
},
exports.signin = function(req, res) {
 
    res.render('index');
 
}
exports.dashboard = function(req, res) {
    ducttape(req, res);
    // res.render('dashboard', {displayName: req.user.displayName , profileImage:req.user.image , aboutuser: req.user.about, id: req.user.id});
 
}
exports.forgot = function (req, res) {
    
    res.render('forgot')
}
exports.reset = function (req, res) {
    res.render('reset')
}
exports.home = function (req, res) {
    res.render("index")
    
}
exports.profileList = function (req, res) {
    TAPE(req, res);
}
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });



 
}
function TAPE(req,res) {
    
    userDB.findAll().then(function(data) {
      profiles = [];
      for (let i = 0; i < data.length; i++) {
        var redacted = {
          id: data[i].id,
          displayName: data[i].displayName,
          image: data[i].image
        };
        profiles.push(redacted);
      }
  
      res.render("list", {profiles:profiles, profileImage:req.user.image, id: req.user.id});
    });

  
}

function ducttape(req, res) {
    

    
    var id = req.user.id;

    var chan = req.params.chan;
    if (!chan){
      chan = "general"
    }
    var class1;
    var class2;
    var class3;
    var class4;
    var class5;
    if(chan === "general") {
      class1 = "nav-links highlighted";
      class2 = "nav-links";
      class3 = "nav-links";
      class4 = "nav-links";
      class5 = "nav-links";
    }
    else if(chan === "gaming_chat") {
      class1 = "nav-links";
      class2 = "nav-links highlighted";
      class3 = "nav-links";
      class4 = "nav-links";
      class5 = "nav-links";
    }
    else if(chan === "tv_chat") {
      class1 = "nav-links";
      class2 = "nav-links";
      class3 = "nav-links highlighted";
      class4 = "nav-links";
      class5 = "nav-links";
    }
    else if(chan === "movie_chat") {
      class1 = "nav-links";
      class2 = "nav-links";
      class3 = "nav-links";
      class4 = "nav-links highlighted";
      class5 = "nav-links";
    }
    else if (chan === "super-bowl-xxx_giggity"){
      class1 = "nav-links";
      class2 = "nav-links";
      class3 = "nav-links";
      class4 = "nav-links";
      class5 = "nav-links highlighted";
    }

    db.Feed.findAll({
      where:{
        channel: chan
      },
      order:[
        ['id', 'DESC'],
      ]
    }).then(function (feed) {
      var feeddata = feed
      //çconsole.log(feeddata);
      userDB.findOne({ where: { id: id } }).then(function(data) {
        res.render("dashboard", {
          feed:feed,
          id:data.id,
          displayName: data.displayName,
          profileImage: data.image,
          aboutuser: data.about,
          chan:chan,
          class1: class1,
          class2: class2,
          class3: class3,
          class4: class4,
          class5: class5
        });
      });
    })
  };