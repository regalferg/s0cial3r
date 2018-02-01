

  $(document).ready(function() {

    console.log("I AM LINKED");

    //#######################CHARLES#####################################
    
    
    var feeder;
    var generalChannel ={
    url: "https://discordapp.com/api/webhooks/407562838324936719/WlmvjQV11V_JhMK5wQhbibIWcw6EDjbwVehzCc-UREmpJnQZwzy8iLELjOsouTNDDrx3",
    name: "general"
    } ;
    var gamingChannel = {
      url:"https://discordapp.com/api/webhooks/408282323222790146/JuT5qAW9607mvfqwyiVBauObKG7Mq6_3wH3zYZPmuPsepr0vnnMQmbkFWrdsYnqLWxj2",
      name: "gaming"
    };
    var tvChannel ={
      url:"https://discordapp.com/api/webhooks/408277081642893332/Q7EwsWNZJgsdFwXIvvqM57d0pLPQwIOx_tcbogpq3er5hJRCDVs6ZT7d3xNwpzkeFCmR",
      name: "tv"
    };
    var sportsChannel  = {
        url:"https://discordapp.com/api/webhooks/408290833171742720/ePL88vKgyqiGkgDNWcQwBPGHOpEFFoJmpfr1RRR88sTZhRGkfJ7QGrUUDeEEEW3NYCrZ",
        name: "sports"
      };
    var movieChannel ={
      url: "https://discordapp.com/api/webhooks/408334142338629632/J-uIxfGDMXSF8U9ZCBMjJ4HQ6Dx7Lkv5BQMSd0ysIaKZlj4HZtHSVpkCsdfF53wN7-An",
      name: "movies"
    };
    
    
    function getFeed(){
        $.get("/api/feed/" + generalChannel.name, function(data){
            console.log(data);
            feeder = data;
                initializeRows();
                })
    
    }
    
    function getSports(data){
      $.get("/api/feed/" + sportsChannel.name, function(data){
        console.log(data);
        feeder = data;
            // initializeRows();
            })
              
    
    }
    function getTV(){
      $.get("/api/tv/" + tvChannel.name, function(data){
          console.log(data);
          feeder = data;
              initializeRows();
              })
    
    }
    function getGaming(){
      $.get("/api/gaming/" + gamingChannel.name, function(data){
          console.log(data);
          feeder = data;
              initializeRows();
              })
    
    }
    function getMovies(){
      $.get("/api/movies/" + movieChannel.name, function(data){
          console.log(data);
          feeder = data;
              initializeRows();
              })
    
    }
    
    
    
    
    function feedSubmit(event){
        var newPost ={
            channel: sportsChannel.name,//channel selection name
            user: "Test",
            message: "ALL YOUR ASSESSMENT ARE BELONG TO US!!"//msgInput.val().trim()
        }
        postFeed(newPost);
    }
    function postFeed(data){
        $.ajax({
            method:"POST",
            url: "/api/feed",
            data:data
    
        }).then(console.log(data));
    
        
        
        var newerData ={
            content: data.message,
            username:data.user
        };
    
        var newData = JSON.stringify(newerData);
        console.log(newData + "Test"); 
        $.ajax({
            type: "POST",
            url:sportsChannel.url ,//channel selection
            data: newData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(msg) {
            console.log('In Ajax');
            }
        });
    }
    
    
    
    
    function initializeRows() {
        
        console.log(feeder);
        var postsToAdd = [];
        for (var i = 0; i < feeder.length; i++) {
        postsToAdd.push(feeder[i]);
        console.log(feeder[i]);
        }
        
    }
    
    
    // getSports();
    
    // getFeed();
        // feedSubmit();
    
    
    
    
    

      });
