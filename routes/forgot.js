var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var bCrypt = require("bcrypt-nodejs");

module.exports = function(app, user){
    var User = user;
    var email 
    var token
app.post('/forgot', function(req, res, next) {

    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
           token = buf.toString('hex');
          console.log(token);
          done(err, token);
        });
      },
      function(token, done) {
          console.log(User)
        User.findOne({where: {email: req.body.email } }).then (function(user) {
          if (!user) {

            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forgot');
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          email = user.email;
  
          user.save(function(err) {
            console.log("saved")
            done(err, token, user);
          });
        }).then(function(user, done) {

          var options = {
            auth: {
              api_user: 'joeman098',
              api_key: 'group7rules'
            }
          }
          var client = nodemailer.createTransport(sgTransport(options));
     
        var mailOptions = {
          to: email,
          from: 'passwordreset@s0cil3r.com',
          subject: 'S0cil3r Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        client.sendMail(mailOptions, function(err,info) {
          req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          if(err){
            console.log(err)
          }
          else{
            console.log("email sent")
          }
        });
      }
    )}
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
  });
  var usertoken 
  app.get('/reset/:token', function(req, res) {
    usertoken =req.params.token
    User.findOne({where:{ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() }} }).then(function(user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
      }
      res.render('reset', {
        // user: req.user
      });
    })
  });


  app.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({where:{ resetPasswordToken: usertoken, resetPasswordExpires: { $gt: Date.now() }} }).then (function(user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
          }
          console.log(req.body.password);
          var pass = bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(8), null);
  
          user.password = pass;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
  
          user.save(function(err) {
            req.logIn(user, function(err) {
              done(err, user);
            });
          });
        }).then(function(user, done) {

          var options = {
            auth: {
              api_user: 'joeman098',
              api_key: 'group7rules'
            }
          }
          var client = nodemailer.createTransport(sgTransport(options));
     
        var mailOptions = {
          to: email,
          from: 'passwordreset@s0cil3r.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account has just been changed.\n'
        };
        client.sendMail(mailOptions, function(err,info) {
          req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          if(err){
            console.log(err)
          }
          else{
            console.log("email sent")
          }
        });
      }
    ).then (function(err) {
      res.redirect('/');
    });
  }

    ],);
  });

};