var db = require("../models");
userDB = db.user;


//discord.js Boilerplate
module.exports = function (app) {
  var Discord = require("discord.js");
  var discordSettings = require("../config/discordSettings.json");
  var bot = new Discord.Client({
    disableEveryone: true
  });
  console.log("This is ready!!");


  bot.on("ready", function () {
    console.log(`Bot is Ready ${bot.user.username}`);

    bot.generateInvite(['ADMINISTRATOR'])
      .then(function (link) {
        // console.log(`Generated bot invite link: ${link}`);
      });

  });

  //New Member Msg on join
  bot.on("GuildMemberAdd", (member) => {
    message.member.send("Welcome!");
  })



  //Post to database
  app.post("/api/feed", function (req, res) {
    db.Feed.create({
      channel: req.body.channel,
      username: req.body.user,
      message: req.body.message
    }).then(function (dbFeed) {
      res.json(dbFeed);
    });
  });




  //Message collection from bot to database
  bot.on('message', function (message) {
    //  console.log(message);
    // console.log(`(${message.guild.name} / ${message.channel.name}) ${message.member.user.username}: ${message.content}`);

    try {
      db.Feed.create({
        guild: message.guild.name,
        channel: message.channel.name,
        username: message.member.user.username,
        message: message.content

      }).then(function (dbFeed) {
        // console.log(dbFeed);
      });
    } catch (err) {
      //   console.log(err);
    }




  });



  // /will reply to messages sent
  bot.on('message', function (message) {

    function replyDiscord() {
      if (message.author.bot) return;

      message.reply('Welcome to s0cial3r!\n Please enter "invite" and the username to invite someone to your channel!  ')
        .then(msg => console.log(`Sent a reply to ${msg.author}`))
        .catch(console.error);
      return;


    }


    if (message.content.indexOf("invite") > -1) {
      if (message.author.bot) return;
      message.channel.createInvite()

        .then(invite =>
          db.Feed.create({
            guild: message.guild.name,
            channel: message.channel.name,
            username: message.member.user.username,
            message: `${invite.url} `

          })

          // console.log(`Created an invite with a code of ${invite.url}`))
          .catch(console.error));

    } else if (message.content.indexOf("help") > -1) {
      replyDiscord();
    }

  })



  bot.login(discordSettings.token);

}
