var authController = require("../controllers/auth_controller.js");
module.exports = function(app, db) {
  var userDB = db.user;
  var friendDB = db.Friendship;
  app.post("/dashboard/edit", function(req, res) {
    id = req.user.id;
    var data = {
      displayName: req.body.displayName,
      email: req.body.email,
      image: req.body.image,
      interests: JSON.stringify(req.body.interests)
    };
    userDB
      .update(data, {
        where: {
          id: id
        }
      })
      .then(function(userdb) {
        console.log(".then");
        res.redirect("/dashboard");
      });
  });
  app.get("/profile/:id/:chan?", function(req, res) {
    
    var id = req.params.id;

    var chan = req.params.chan;
    if (!chan){
      chan = "general"
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
      console.log(feeddata);
      userDB.findOne({ where: { id: id } }).then(function(data) {
        res.render("profile", {
          feed:feed,
          id:data.id,
          displayName: data.displayName,
          profileImage: data.image,
          aboutuser: data.about,
          chan:chan
        });
      });
    })
  });

  app.get("/api/friends/:id", function(req, res) {
    var id = req.params.id;
    friendDB.findAll({ where: { User1: id } }).then(function(data) {
      res.json(data);
    });
  });
  app.get("/api/profiles/", function(req, res) {
    userDB.findAll().then(function(data) {
      redactarray = [];
      for (let i = 0; i < data.length; i++) {
        var redacted = {
          id: data[i].id,
          displayName: data[i].displayName,
          image: data[i].image
        };
        redactarray.push(redacted);
      }

      res.json(redactarray);
    });
  });
  app.get("/api/profile/:id", function(req, res) {
    var id = req.params.id;
    userDB.findAll({ where: { id: id } }).then(function(data) {
      var redacted = {
        id: data[0].id,
        displayName: data[0].displayName,
        image: data[0].image
      };

      res.json(redacted);
    });
  });

  app.post("/sendFriend", function(req, res) {
    var reqid = req.user.id;
    var fid = req.body.uid;
    var test = {
      User1: reqid,
      User2: fid
    };
    var holdId;
    friendDB
      .findOne({ where: { User1: reqid, User2: fid } })
      .then(function(data) {
        if (data) {
          console.log("your friends allready");
          res.json(data);
        } else {
          friendDB
            .create(test)
            .then(function(data) {
              holdId = data.id;
              res.json(data);
            })
            .then(function() {
              friendDB
                .findOne({ where: { User1: fid, User2: reqid } })
                .then(function(data) {
                  if (data) {
                    var id = data.id;
                    friendDB
                      .update(
                        { accepted: true },
                        { where: { User1: fid, User2: reqid } }
                      )
                      .then(function() {
                        friendDB.update(
                          { accepted: true },
                          { where: { User1: reqid, User2: fid } }
                        );
                      });
                  }
                });
            });
        }
      });
  });
  function getFeed(){
  
      db.Feed.findAll({
        limit:2,
        where:{
          channel:"test"
        }
      }).then(function(dbFeed) {
        // console.log(dbFeed)
        feed = dbFeed
      });

    };
  
};
