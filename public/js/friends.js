$(document).ready(function() {
  var id = $("#profile-logo").text();
  var friends;
  $.ajax("/api/friends/" + id, {
    type: "GET"
  }).then(function(data) {
    friends = data;
    $.ajax("/api/profiles/", {
      type: "GET"
    }).then(function(profiles) {
      $("#friends-count").text(friends.length);
      for (let i = 0; i < friends.length; i++) {
        for (let p = 0; p < profiles.length; p++) {
          if (friends[i].User2 == profiles[p].id) {
            var newFriend = $("<div>");
            var friendname = $("<div>");
            var img = $("<img>");
            var a = $("<a>");
            newFriend.attr("class", "friend");
            img.attr("id", "friend-img");
            img.attr("src", profiles[p].image);
            newFriend.append(img);
            friendname.attr("class", "friend-name");
            a.attr("class", "friendname");
            a.html(
              "<a href=/profile/" +
                profiles[p].id +
                ">" +
                profiles[p].displayName +
                "</a>"
            );
            a.appendTo(friendname);
            newFriend.append(friendname);
            newFriend.appendTo("#frendo");
          }
        }
      }
    });
  });
// $("#addfriends").event("click",event)
// event.preventDefault();

// $.ajax("/api/friends/" + id, {
//   type: "GET"
// }).

});
// id="friends-count"

// <div class="friend">
// <img src="https://cdn.imaginetricks.com/wp-content/uploads/2017/08/Wonderful-Cute-Girls-Profile-Picture.jpg" id="friend-img"/>
// <div class="friend-name">
//     <a href="#" class="friendname">@friendname</a>
// </div>
