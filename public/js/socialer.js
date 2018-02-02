
$(document).ready(function() {
  // setTimeout(function() {
  //   location.reload();
  // }, 5000);

  console.log("I AM LINKED");
  //########################CHARLES Fn' rocks###################################
  var feeder;
  //Objects for Posts to db and app
  var generalChannel = {
    url: "https://discordapp.com/api/webhooks/407562838324936719/WlmvjQV11V_JhMK5wQhbibIWcw6EDjbwVehzCc-UREmpJnQZwzy8iLELjOsouTNDDrx3",
    name: "general"
  };

  var gamingChannel = {
    url: "https://discordapp.com/api/webhooks/408282323222790146/JuT5qAW9607mvfqwyiVBauObKG7Mq6_3wH3zYZPmuPsepr0vnnMQmbkFWrdsYnqLWxj2",
    name: "gaming"
  };
  var tvChannel = {
    url: "https://discordapp.com/api/webhooks/408277081642893332/Q7EwsWNZJgsdFwXIvvqM57d0pLPQwIOx_tcbogpq3er5hJRCDVs6ZT7d3xNwpzkeFCmR",
    name: "tv"
  };
  var sportsChannel = {
    url: "https://discordapp.com/api/webhooks/408290833171742720/ePL88vKgyqiGkgDNWcQwBPGHOpEFFoJmpfr1RRR88sTZhRGkfJ7QGrUUDeEEEW3NYCrZ",
    name: "sports"
  };
  var movieChannel = {
    url: "https://discordapp.com/api/webhooks/408334142338629632/J-uIxfGDMXSF8U9ZCBMjJ4HQ6Dx7Lkv5BQMSd0ysIaKZlj4HZtHSVpkCsdfF53wN7-An",
    name: "movies"
  };




  //Main event handler for post to database and discord
  function feedSubmit(event) {
    var links;
    console.log($("#linky").text());
    if ($("#linky").text() === "gaming_chat") {
      links = gamingChannel.url;
      console.log(links);
    } else if ($("#linky").text() === "tv_chat") {
      links = tvChannel.url;
      console.log(links);
    } else if ($("#linky").text() === "general") {
      links = generalChannel.url;
      console.log(links);
    } else if ($("#linky").text() === "movie_chat") {
      links = movieChannel.url;
      console.log(links);
    } else if ($("#linky").text() === "super-bowl-xxx_giggity") {
      links = sportsChannel.url;

    }
    var newPost = {
      channel: $("#linky").text(), //channel selection name
      user: $("#username-display-dashboard").text(),
      message: $("#post-input").val().trim() //msgInput.val().trim()
    }
    postFeed(newPost);
  }


  //Post cont...
  function postFeed(data) {


    $.ajax({
      method: "POST",
      url: "/api/feed",
      data: data

    }).then(console.log(data));

    var links;
    console.log($("#linky").text());
    if ($("#linky").text() === "gaming_chat") {
      links = gamingChannel.url;
      console.log(links);
    } else if ($("#linky").text() === "tv_chat") {
      links = tvChannel.url;
      console.log(links);
    } else if ($("#linky").text() === "general") {
      links = generalChannel.url;
      console.log(links);
    } else if ($("#linky").text() === "movie_chat") {
      links = movieChannel.url;
      console.log(links);
    } else if ($("#linky").text() === "super-bowl-xxx_giggity") {
      links = sportsChannel.url;

    }

    var newerData = {
      content: data.message,
      username: data.user
    };

    var newData = JSON.stringify(newerData);
    console.log(newData + "Test");
    $.ajax({
      type: "POST",
      url: links, //channel selection
      data: newData,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (msg) {
        console.log('In Ajax');
      }
    });
  }



  //This is functional, posts to db and discord
  $("#post-button").click(function (event) {
    // event.preventDefault();
    feedSubmit();
    $("#post-input").val('');
  });


  // Convert to hyperlink
  function convert(){
    if ($("#post-body").text().indexOf("http") > -1) {
      $("#hyp0r").attr("href",$("#post-body").html());
      var val = $("#hyp0r").html("Click Here To Join Discord Chat");
    }
  }
  convert();



//###############ALL THE WAY TO HERE##############################







//turning animation function
  var loginCardDegree = 1;
  function loginRotateY() {
    var timeoutId;
    clearTimeout(timeoutId);
    document.getElementById("login-card").style.transform = "rotateY("+loginCardDegree+"deg)";

    loginCardDegree++;
    console.log(loginCardDegree);

    if(loginCardDegree <= 180) {
      timeoutId = setTimeout(loginRotateY, 2);
    }
    else {
      return;
    }
  }
 //turning animation function part 2 
  var profileCardDegree = 89;
  function createProfileRotateY() {
    var timeoutId;
    clearTimeout(timeoutId);
    document.getElementById("create-profile-card").style.transform = "rotateY(-"+profileCardDegree+"deg)";

    profileCardDegree--;
    console.log(profileCardDegree);

    if(profileCardDegree >= 0) {
      timeoutId = setTimeout(createProfileRotateY, 2);
    }
    else {
      return;
    }
  }
  //removes message flashes in 3 seconds on page load
  var friendTimeoutId = setTimeout(function() {
    $("#friend-error-message").fadeOut("slow");
    $("#friend-add-message").fadeOut("slow");
  }, 3000);

  var interests = [];
  var updateInterests = [];

  //initiates rotation and generates create profile form
  $("#register").on("click", function() {
    loginRotateY();
    $("#main-page-title").fadeOut("slow");
    $("#login-card-links").fadeOut("slow");
    $("#login-card").fadeOut("slow");

    var createProfileCard = $("<div>");
    createProfileCard.addClass("card");
    createProfileCard.attr("id", "create-profile-card");

    var cardContent = $("<div>");
    cardContent.addClass("card-content white-text ");
    cardContent.attr("id", "profile-card-content");

    var mainRow = $('<div class="row">');

    var registerForm = $("<form>");
    registerForm.addClass("col s12");
    registerForm.attr("id", "register-form");
    registerForm.attr("name", "register-form");
    registerForm.attr("method", "post");
    registerForm.attr("action", "/signup");

    var formTitle = $("<h5>");
    formTitle.attr("id", "form-title");
    formTitle.text("ENTER YOUR PROFILE INFORMATION");

    var titleBreak = $("<br>");

    var rowOne = $('<div class="row">');

    var loginInfoTitle = $("<h6>");
    loginInfoTitle.attr("id", "loginInfoTitle");
    loginInfoTitle.text("LOGIN CREDENTIALS");

    var inputFieldOne = $("<div>");
    inputFieldOne.addClass("input-field col s12 m6");

    var displayNameInput = $("<input>");
    displayNameInput.addClass("validate");
    displayNameInput.attr("id", "displayName");
    displayNameInput.attr("name", "displayName");
    displayNameInput.attr("type", "text");

    var displayNameLabel = $("<label>");
    displayNameLabel.attr("for", "displayName");
    displayNameLabel.attr("id", "displayNameLabel");
    displayNameLabel.text("Display Name");

    var inputFieldTwo = $("<div>");
    inputFieldTwo.addClass("input-field col s12 m6");

    var userEmailInput = $("<input>");
    userEmailInput.addClass("validate");
    userEmailInput.attr("id", "userEmail");
    userEmailInput.attr("name", "userEmail");
    userEmailInput.attr("type", "email");

    var userEmailLabel = $("<label>");
    userEmailLabel.attr("for", "user-email");
    userEmailLabel.attr("id", "userEmailLabel");
    userEmailLabel.text("Email");

    inputFieldOne.append(displayNameInput, displayNameLabel);
    inputFieldTwo.append(userEmailInput, userEmailLabel);
    rowOne.append(loginInfoTitle, inputFieldOne, inputFieldTwo);

    var rowTwo = $('<div class="row">');

    var inputFieldThree = $("<div>");
    inputFieldThree.addClass("input-field col s12 m6");

    var passwordInput = $("<input>");
    passwordInput.attr("name", "password");
    passwordInput.attr("id", "passwordInput");
    passwordInput.attr("type", "password");
    passwordInput.addClass("validate");

    var passwordLabel = $("<label>");
    passwordLabel.attr("for", "password");
    passwordLabel.attr("id", "userPasswordLabel");
    passwordLabel.text("Password");

    var inputFieldFour = $("<div>");
    inputFieldFour.addClass("input-field col s12 m6");

    var passwordConfirmInput = $("<input>");
    passwordConfirmInput.attr("id", "passwordConfirmInput");
    passwordConfirmInput.attr("name", "confirmPassword");
    passwordConfirmInput.attr("type", "password");
    passwordConfirmInput.addClass("validate");

    var passwordConfirmLabel = $("<label>");
    passwordConfirmLabel.attr("for", "confirm-password");
    passwordConfirmLabel.attr("id", "userPasswordConfirmLabel");
    passwordConfirmLabel.text("Confirm Password");

    inputFieldThree.append(passwordInput, passwordLabel);
    inputFieldFour.append(passwordConfirmInput, passwordConfirmLabel);
    rowTwo.append(inputFieldThree, inputFieldFour);

    var rowThree = $('<div class="row">');

    var profilePicTitle = $("<h6>");
    profilePicTitle.attr("id", "profilePicTitle");
    profilePicTitle.text("PROFILE PICTURE");

    var inputFieldFive = $("<div>");
    inputFieldFive.addClass("input-field col s12");
    
    var imageLink = $("<input>");
    imageLink.addClass("validate");
    imageLink.attr("id", "image-link");
    imageLink.attr("name", "imageLink");
    imageLink.attr("type", "text");

    var imageLinkLabel = $("<label>");
    imageLinkLabel.attr("for", "image-link");
    imageLinkLabel.attr("id", "imageLinkLabel");
    imageLinkLabel.text("Paste a link to an image of yourself");

    inputFieldFive.append(imageLink, imageLinkLabel);
    rowThree.append(profilePicTitle, inputFieldFive);

    var rowFour = $('<div class="row">');

    var interestsTitle = $("<h6>");
    interestsTitle.attr("id", "interestsTitle");
    interestsTitle.text("TOPICS OF INTEREST");

    rowFour.append(interestsTitle);

    var rowFive = $('<div class="row">');

    var gamingCategoryTitleCol = $("<div>");
    gamingCategoryTitleCol.addClass("col s3");

    var gamingCategoryTitle = $("<h6>");
    gamingCategoryTitle.attr("id", "gamingCategoryTitle");
    gamingCategoryTitle.text("GAMING");

    gamingCategoryTitleCol.append(gamingCategoryTitle);

    var tvCategoryTitleCol = $("<div>");
    tvCategoryTitleCol.addClass("col s3");

    var tvCategoryTitle = $("<h6>");
    tvCategoryTitle.attr("id", "tvCategoryTitle");
    tvCategoryTitle.text("TV SHOWS");

    tvCategoryTitleCol.append(tvCategoryTitle);

    var movieCategoryTitleCol = $("<div>");
    movieCategoryTitleCol.addClass("col s3");

    var movieCategoryTitle = $("<h6>");
    movieCategoryTitle.attr("id", "movieCategoryTitle");
    movieCategoryTitle.text("MOVIES");

    movieCategoryTitleCol.append(movieCategoryTitle);

    var sportsCategoryTitleCol = $("<div>");
    sportsCategoryTitleCol.addClass("col s3");

    var sportsCategoryTitle = $("<h6>");
    sportsCategoryTitle.attr("id", "sportsCategoryTitle");
    sportsCategoryTitle.text("SPORTS");

    sportsCategoryTitleCol.append(sportsCategoryTitle);

    rowFive.append(gamingCategoryTitleCol, tvCategoryTitleCol, movieCategoryTitleCol, sportsCategoryTitleCol);

    var rowSix = $('<div class="row">');

    var gamingSwitchCol = $("<div>");
    gamingSwitchCol.addClass("col s3");

    var gamingSwitch = $("<div>");
    gamingSwitch.addClass("switch");
    var gamingLabel = $("<label>");
    gamingLabel.attr("id", "gamingLabel");
    var gamingInput = $("<input>");
    gamingInput.attr("type", "checkbox");
    gamingInput.attr("id", "gamingCheckbox");
    gamingInput.addClass("categoryCheckbox");
    var gamingSpan = $("<span>");
    gamingSpan.attr("class", "lever");

    gamingLabel.append("No", gamingInput, gamingSpan, "Yes")
    gamingSwitch.append(gamingLabel);
    gamingSwitchCol.append(gamingSwitch);

    var tvSwitchCol = $("<div>");
    tvSwitchCol.addClass("col s3");

    var tvSwitch = $("<div>");
    tvSwitch.addClass("switch");
    var tvLabel = $("<label>");
    tvLabel.attr("id", "tvLabel");
    var tvInput = $("<input>");
    tvInput.attr("type", "checkbox");
    tvInput.attr("id", "tvCheckbox");
    tvInput.addClass("categoryCheckbox");
    var tvSpan = $("<span>");
    tvSpan.attr("class", "lever");

    tvLabel.append("No", tvInput, tvSpan, "Yes")
    tvSwitch.append(tvLabel);
    tvSwitchCol.append(tvSwitch);

    var movieSwitchCol = $("<div>");
    movieSwitchCol.addClass("col s3");

    var movieSwitch = $("<div>");
    movieSwitch.addClass("switch");
    var movieLabel = $("<label>");
    movieLabel.attr("id", "movieLabel");
    var movieInput = $("<input>");
    movieInput.attr("type", "checkbox");
    movieInput.attr("id", "movieCheckbox");
    movieInput.addClass("categoryCheckbox");
    var movieSpan = $("<span>");
    movieSpan.attr("class", "lever");

    movieLabel.append("No", movieInput, movieSpan, "Yes")
    movieSwitch.append(movieLabel);
    movieSwitchCol.append(movieSwitch);

    var sportsSwitchCol = $("<div>");
    sportsSwitchCol.addClass("col s3");

    var sportsSwitch = $("<div>");
    sportsSwitch.addClass("switch");
    var sportsLabel = $("<label>");
    sportsLabel.attr("id", "sportsLabel");
    var sportsInput = $("<input>");
    sportsInput.attr("type", "checkbox");
    sportsInput.attr("id", "sportsCheckbox");
    sportsInput.addClass("categoryCheckbox");
    var sportsSpan = $("<span>");
    sportsSpan.attr("class", "lever");

    sportsLabel.append("No", sportsInput, sportsSpan, "Yes")
    sportsSwitch.append(sportsLabel);
    sportsSwitchCol.append(sportsSwitch);

    rowSix.append(gamingSwitchCol, tvSwitchCol, movieSwitchCol, sportsSwitchCol);

    var rowSeven = $('<div class="row">');

    var inputFieldSix = $("<div>");
    inputFieldSix.addClass("input-field col s12");

    var createProfileButton = $("<input>");
    createProfileButton.addClass("btn");
    createProfileButton.attr("type", "submit");
    createProfileButton.attr("value", "CREATE PROFILE");
    createProfileButton.attr("id", "create-profile-button");

    inputFieldSix.append(createProfileButton);
    rowSeven.append(inputFieldSix);


    registerForm.append(rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix, rowSeven);
    mainRow.append(formTitle, titleBreak, registerForm);
    cardContent.append(mainRow);
    createProfileCard.append(cardContent);
    createProfileCard.hide();
    $("#card-col").append(createProfileCard);

    var turnTimeoutId = setTimeout(function() {
      createProfileRotateY();
    }, 450);

    var timeoutId = setTimeout(function(){
      createProfileCard.fadeIn("slow");
    }, 575);

    //pushes user selection from switches to array to store in database
    $(function() {
      $(".categoryCheckbox").click(function() {
        var isGamingChecked = $("#gamingCheckbox").prop("checked");
        var isTvChecked = $("#tvCheckbox").prop("checked");
        var isMovieChecked = $("#movieCheckbox").prop("checked");
        var isSportsChecked = $("#sportsCheckbox").prop("checked");

        var gamingInterest = "Gaming";
        var tvInterest = "TV Shows";
        var movieInterest = "Movies";
        var sportsInterest = "Sports";

        if(isGamingChecked) {
          gamingCategoryTitle.css("color", "#7289da");
          for (var i = -1; i < interests.length; i++) {
            if(interests.indexOf(gamingInterest) === -1) {
              interests.push(gamingInterest);
              console.log(interests);
            }
          }
        }
        else {
          gamingCategoryTitle.css("color", "white");
          if(interests.indexOf(gamingInterest) !== -1) {
            var interestIndex = interests.indexOf(gamingInterest);
            interests.splice(interestIndex, 1);
            console.log(interests);
          }
        }

        if(isTvChecked) {
          tvCategoryTitle.css("color", "#7289da");
          for (var i = -1; i < interests.length; i++) {
            if(interests.indexOf(tvInterest) === -1) {
              interests.push(tvInterest);
              console.log(interests);
            }
          }
        }
        else {
          tvCategoryTitle.css("color", "white");
          if(interests.indexOf(tvInterest) !== -1) {
            var interestIndex = interests.indexOf(tvInterest);
            interests.splice(interestIndex, 1);
            console.log(interests);
          }
        }

        if(isMovieChecked) {
          movieCategoryTitle.css("color", "#7289da");
          for (var i = -1; i < interests.length; i++) {
            if(interests.indexOf(movieInterest) === -1) {
              interests.push(movieInterest);
              console.log(interests);
            }
          }        
        }
        else {
          movieCategoryTitle.css("color", "white");
          if(interests.indexOf(movieInterest) !== -1) {
            var interestIndex = interests.indexOf(movieInterest);
            interests.splice(interestIndex, 1);
            console.log(interests);
          }
        }

        if(isSportsChecked) {
          sportsCategoryTitle.css("color", "#7289da");
          for (var i = -1; i < interests.length; i++) {
            if(interests.indexOf(sportsInterest) === -1) {
              interests.push(sportsInterest);
              console.log(interests);
            }
          }   
        }
        else {
          sportsCategoryTitle.css("color", "white");
          if(interests.indexOf(sportsInterest) !== -1) {
            var interestIndex = interests.indexOf(sportsInterest);
            interests.splice(interestIndex, 1);
            console.log(interests);
          }
        }
      });
    });
  });

  //creates new profile by sending info to database
  $(document).on("click", "#create-profile-button", function(event){
    event.preventDefault();

    console.log(interests);
    
    var newUser = {
      displayName: $("#displayName").val().trim(),
      email: $("#userEmail").val().trim(),
      password: $("#passwordInput").val().trim(),
      ProfileImage: $("#image-link").val().trim(),
      interests: JSON.stringify(interests)
    }

    $.ajax("/signup", {
      type: "POST",
      data: newUser
    }).then(function(data) {
      console.log("New User Created");
      location.reload();
    });
  })
  //hides divs
  $("#main-chat-link").on("click", function() {
    $("#feed-row").show();
    $("#discord-widget").show();
    $("#friends-card").show();
    $("#search-bar-div-profile").show();
    $("#update-profile-card").hide();
  })

  $("#gaming-chat-link").on("click", function() {
    $("#feed-row").show();
    $("#discord-widget").show();
    $("#friends-card").show();
    $("#update-profile-card").hide();
  })

  $("#tv-chat-link").on("click", function() {
    $("#feed-row").show();
    $("#discord-widget").show();
    $("#friends-card").show();
    $("#search-bar-div-profile").show();
    $("#update-profile-card").hide();
  })

  $("#movie-chat-link").on("click", function() {
    $("#feed-row").show();
    $("#discord-widget").show();
    $("#friends-card").show();
    $("#search-bar-div-profile").show();
    $("#update-profile-card").hide();
  })

  $("#sports-chat-link").on("click", function() {
    $("#feed-row").show();
    $("#discord-widget").show();
    $("#friends-card").show();
    $("#search-bar-div-profile").show();
    $("#update-profile-card").hide();
  })
  //generates update profile form when user clicks Edit Profile button on dashboard
  $("#edit-profile-link").on("click", function() {
    $(".highlighted").removeClass("highlighted");
    $(this).addClass("highlighted");
    $("#feed-row").hide();
    $("#discord-widget").hide();
    $("#friends-card").hide();
    $("#search-bar-div-profile").hide();

    var updateProfileCardCol = $("<div>");
    updateProfileCardCol.addClass("col m10 offset-m1 l10 offset-l1 xl8 offset-xl2");

    var updateProfileCard = $("<div>");
    updateProfileCard.addClass("card");
    updateProfileCard.attr("id", "update-profile-card");

    var updateCardContent = $("<div>");
    updateCardContent.addClass("card-content white-text ");
    updateCardContent.attr("id", "update-profile-card-content");

    var updateMainRow = $('<div class="row">');

    var updateForm = $("<form>");
    updateForm.addClass("col s12");
    updateForm.attr("id", "update-form");
    updateForm.attr("name", "update-form");

    var updateFormTitle = $("<h5>");
    updateFormTitle.attr("id", "update-form-title");
    updateFormTitle.text("UPDATE YOUR PROFILE INFORMATION");

    var updateTitleBreak = $("<br>");

    var updateRowOne = $('<div class="row">');

    var updateInputFieldOne = $("<div>");
    updateInputFieldOne.addClass("input-field col s12");

    var updateDisplayNameInput = $("<input>");
    updateDisplayNameInput.addClass("validate");
    updateDisplayNameInput.attr("id", "updateDisplayName");
    updateDisplayNameInput.attr("name", "updateDisplayName");
    updateDisplayNameInput.attr("type", "text");

    var updateDisplayNameLabel = $("<label>");
    updateDisplayNameLabel.attr("for", "updateDisplayName");
    updateDisplayNameLabel.attr("id", "updateDisplayNameLabel");
    updateDisplayNameLabel.text("Display Name");

    var updateInputFieldTwo = $("<div>");
    updateInputFieldTwo.addClass("input-field col s12");

    updateInputFieldOne.append(updateDisplayNameInput, updateDisplayNameLabel);
    updateRowOne.append(updateInputFieldOne);

    var updateRowTwo = $('<div class="row">');

    var updateInputFieldThree = $("<div>");
    updateInputFieldThree.addClass("input-field col s12");

    var updateImageLink = $("<input>");
    updateImageLink.addClass("validate");
    updateImageLink.attr("id", "update-image-link");
    updateImageLink.attr("name", "updateImageLink");
    updateImageLink.attr("type", "text");

    var updateImageLinkLabel = $("<label>");
    updateImageLinkLabel.attr("for", "update-image-link");
    updateImageLinkLabel.attr("id", "updateImageLinkLabel");
    updateImageLinkLabel.text("Paste a link to an image of yourself");

    updateInputFieldThree.append(updateImageLink, updateImageLinkLabel);
    updateRowTwo.append(updateInputFieldThree);

    var updateRowThree = $('<div class="row">');

    var updateInterestsTitle = $("<h6>");
    updateInterestsTitle.attr("id", "updateInterestsTitle");
    updateInterestsTitle.text("TOPICS OF INTEREST");

    updateRowThree.append(updateInterestsTitle);

    var updateRowFour = $('<div class="row">');

    var updateGamingCategoryTitleCol = $("<div>");
    updateGamingCategoryTitleCol.addClass("col s3");

    var updateGamingCategoryTitle = $("<h6>");
    updateGamingCategoryTitle.attr("id", "updateGamingCategoryTitle");
    updateGamingCategoryTitle.text("GAMING");

    updateGamingCategoryTitleCol.append(updateGamingCategoryTitle);

    var updateTvCategoryTitleCol = $("<div>");
    updateTvCategoryTitleCol.addClass("col s3");

    var updateTvCategoryTitle = $("<h6>");
    updateTvCategoryTitle.attr("id", "updateTvCategoryTitle");
    updateTvCategoryTitle.text("TV SHOWS");

    updateTvCategoryTitleCol.append(updateTvCategoryTitle);

    var updateMovieCategoryTitleCol = $("<div>");
    updateMovieCategoryTitleCol.addClass("col s3");

    var updateMovieCategoryTitle = $("<h6>");
    updateMovieCategoryTitle.attr("id", "updateMovieCategoryTitle");
    updateMovieCategoryTitle.text("MOVIES");

    updateMovieCategoryTitleCol.append(updateMovieCategoryTitle);

    var updateSportsCategoryTitleCol = $("<div>");
    updateSportsCategoryTitleCol.addClass("col s3");

    var updateSportsCategoryTitle = $("<h6>");
    updateSportsCategoryTitle.attr("id", "updateSportsCategoryTitle");
    updateSportsCategoryTitle.text("SPORTS");

    updateSportsCategoryTitleCol.append(updateSportsCategoryTitle);

    updateRowFour.append(updateGamingCategoryTitleCol, updateTvCategoryTitleCol, updateMovieCategoryTitleCol, updateSportsCategoryTitleCol);

    var updateRowFive= $('<div class="row">');

    var updateGamingSwitchCol = $("<div>");
    updateGamingSwitchCol.addClass("col s3");

    var updateGamingSwitch = $("<div>");
    updateGamingSwitch.addClass("switch");
    var updateGamingLabel = $("<label>");
    var updateGamingInput = $("<input>");
    updateGamingInput.attr("type", "checkbox");
    updateGamingInput.attr("id", "updateGamingCheckbox");
    updateGamingInput.addClass("updateCategoryCheckbox");
    var updateGamingSpan = $("<span>");
    updateGamingSpan.attr("class", "lever");

    updateGamingLabel.append("No", updateGamingInput, updateGamingSpan, "Yes")
    updateGamingSwitch.append(updateGamingLabel);
    updateGamingSwitchCol.append(updateGamingSwitch);

    var updateTvSwitchCol = $("<div>");
    updateTvSwitchCol.addClass("col s3");

    var updateTvSwitch = $("<div>");
    updateTvSwitch.addClass("switch");
    var updateTvLabel = $("<label>");
    var updateTvInput = $("<input>");
    updateTvInput.attr("type", "checkbox");
    updateTvInput.attr("id", "updateTvCheckbox");
    updateTvInput.addClass("updateCategoryCheckbox");
    var updateTvSpan = $("<span>");
    updateTvSpan.attr("class", "lever");

    updateTvLabel.append("No", updateTvInput, updateTvSpan, "Yes")
    updateTvSwitch.append(updateTvLabel);
    updateTvSwitchCol.append(updateTvSwitch);

    var updateMovieSwitchCol = $("<div>");
    updateMovieSwitchCol.addClass("col s3");

    var updateMovieSwitch = $("<div>");
    updateMovieSwitch.addClass("switch");
    var updateMovieLabel = $("<label>");
    var updateMovieInput = $("<input>");
    updateMovieInput.attr("type", "checkbox");
    updateMovieInput.attr("id", "updateMovieCheckbox");
    updateMovieInput.addClass("updateCategoryCheckbox");
    var updateMovieSpan = $("<span>");
    updateMovieSpan.attr("class", "lever");

    updateMovieLabel.append("No", updateMovieInput, updateMovieSpan, "Yes")
    updateMovieSwitch.append(updateMovieLabel);
    updateMovieSwitchCol.append(updateMovieSwitch);

    var updateSportsSwitchCol = $("<div>");
    updateSportsSwitchCol.addClass("col s3");

    var updateSportsSwitch = $("<div>");
    updateSportsSwitch.addClass("switch");
    var updateSportsLabel = $("<label>");
    var updateSportsInput = $("<input>");
    updateSportsInput.attr("type", "checkbox");
    updateSportsInput.attr("id", "updateSportsCheckbox");
    updateSportsInput.addClass("updateCategoryCheckbox");
    var updateSportsSpan = $("<span>");
    updateSportsSpan.attr("class", "lever");

    updateSportsLabel.append("No", updateSportsInput, updateSportsSpan, "Yes")
    updateSportsSwitch.append(updateSportsLabel);
    updateSportsSwitchCol.append(updateSportsSwitch);

    updateRowFive.append(updateGamingSwitchCol, updateTvSwitchCol, updateMovieSwitchCol, updateSportsSwitchCol);

    var updateRowSix = $('<div class="row">');

    var updateInputFieldFour = $("<div>");
    updateInputFieldFour.addClass("input-field col s12");

    var updateProfileButton = $("<input>");
    updateProfileButton.addClass("btn");
    updateProfileButton.attr("type", "submit");
    updateProfileButton.attr("value", "UPDATE PROFILE");
    updateProfileButton.attr("id", "update-profile-button");

    updateInputFieldFour.append(updateProfileButton);
    updateRowSix.append(updateInputFieldFour);


    updateForm.append(updateRowOne, updateRowTwo, updateRowThree, updateRowFour, updateRowFive, updateRowSix);
    updateMainRow.append(updateFormTitle, updateForm);
    updateCardContent.append(updateMainRow);
    updateProfileCard.append(updateCardContent);
    updateProfileCardCol.append(updateProfileCard);
    $("#profile-page-content").append(updateProfileCardCol);

    $(function() {
      $(".updateCategoryCheckbox").click(function() {
        var isGamingChecked = $("#updateGamingCheckbox").prop("checked");
        var isTvChecked = $("#updateTvCheckbox").prop("checked");
        var isMovieChecked = $("#updateMovieCheckbox").prop("checked");
        var isSportsChecked = $("#updateSportsCheckbox").prop("checked");

        var gamingInterest = "Gaming";
        var tvInterest = "TV Shows";
        var movieInterest = "Movies";
        var sportsInterest = "Sports";

        if(isGamingChecked) {
          updateGamingCategoryTitle.css("color", "#7289da");
          for (var i = -1; i < updateInterests.length; i++) {
            if(updateInterests.indexOf(gamingInterest) === -1) {
              updateInterests.push(gamingInterest);
              console.log(updateInterests);
            }
          }
        }
        else {
          updateGamingCategoryTitle.css("color", "white");
          if(updateInterests.indexOf(gamingInterest) !== -1) {
            var interestIndex = updateInterests.indexOf(gamingInterest);
            updateInterests.splice(interestIndex, 1);
            console.log(updateInterests);
          }
        }

        if(isTvChecked) {
          updateTvCategoryTitle.css("color", "#7289da");
          for (var i = -1; i < updateInterests.length; i++) {
            if(updateInterests.indexOf(tvInterest) === -1) {
              updateInterests.push(tvInterest);
              console.log(updateInterests);
            }
          }
        }
        else {
          updateTvCategoryTitle.css("color", "white");
          if(updateInterests.indexOf(tvInterest) !== -1) {
            var interestIndex = updateInterests.indexOf(tvInterest);
            updateInterests.splice(interestIndex, 1);
            console.log(updateInterests);
          }
        }

        if(isMovieChecked) {
          updateMovieCategoryTitle.css("color", "#7289da");
          for (var i = -1; i < updateInterests.length; i++) {
            if(updateInterests.indexOf(movieInterest) === -1) {
              updateInterests.push(movieInterest);
              console.log(updateInterests);
            }
          }        
        }
        else {
          updateMovieCategoryTitle.css("color", "white");
          if(updateInterests.indexOf(movieInterest) !== -1) {
            var interestIndex = updateInterests.indexOf(movieInterest);
            updateInterests.splice(interestIndex, 1);
            console.log(updateInterests);
          }
        }

        if(isSportsChecked) {
          updateSportsCategoryTitle.css("color", "#7289da");
          for (var i = -1; i < updateInterests.length; i++) {
            if(updateInterests.indexOf(sportsInterest) === -1) {
              updateInterests.push(sportsInterest);
              console.log(updateInterests);
            }
          }   
        }
        else {
          updateSportsCategoryTitle.css("color", "white");
          if(updateInterests.indexOf(sportsInterest) !== -1) {
            var interestIndex = updateInterests.indexOf(sportsInterest);
            updateInterests.splice(interestIndex, 1);
            console.log(updateInterests);
          }
        }
      });
    });
    $("#update-profile-card").fadeIn("slow");
    
//sends updated profile information to database
    $(document).on("click", "#update-profile-button", function(event) {
      event.preventDefault();
      var updateUser = {
        displayName: $("#updateDisplayName").val(),
        email: $("#updateUserEmail").val(),
        image: $("#update-image-link").val(),
        interests: JSON.stringify(updateInterests)
      }
      console.log(updateUser)
      $.ajax("/dashboard/edit", {
        type: "POST",
        data: updateUser
      }).then(function(data){
        location.reload();
      });
    });
  });
});