$(document).ready(function(){
    function offLine(linkName){
        var firstPart = '<a href="https://go.twitch.tv/' + linkName + '" target="blank" style="color: red">';
        return firstPart;
    }
    function onLine(linkName){
        var firstPart = '<a href="https://go.twitch.tv/' + linkName + '" target="blank" style="color: green">';
        return firstPart;
    }
    var following = ["Quixities1","Quixities2","Quixities3"];
    var streamUrl = "https://wind-bow.glitch.me/twitch-api/streams/";
    var usersUrl = "https://wind-bow.glitch.me/twitch-api/users/";
    var userStreams = ["ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    var bio;
    var displayName;
    var logo;
    var status;


    //GET FCC USER DETAILS
    $.getJSON(usersUrl + "freecodecamp", function(jsonFccDetails){
        bio = jsonFccDetails.bio;
        displayName = jsonFccDetails.display_name;
        logo = jsonFccDetails.logo;
        $("#fccLogo").html('<img src="' + logo + '" alt="fcc logo">');
        $("#displayName").html(displayName);
        $("#fccBio").html("<p><br />" + bio.replace() + "</p>");
        $.getJSON(streamUrl + "freecodecamp", function(jsonStatus){
            //var fccTwitchLink = "https://go.twitch.tv/freecodecamp";
            status = jsonStatus.stream;
            if(status === null){
                $("#fccStatus").html(offLine("freecodecamp") + 'OFF LINE</a>')
            }
            else{
                $("#fccStatus").html(onLine("freecodecamp") + 'ON LINE</a>')
            }
        });
    });

    //GET USERS - FOLLOWS AND SUGGESTED USERS FROM CHALLENGE
    $.getJSON("https://wind-bow.glitch.me/twitch-api/users/freecodecamp/follows/channels/", function(jsonFccFollows){

        for(var i = 0; i < jsonFccFollows.follows.length; i++){
            displayName = jsonFccFollows.follows[i].channel.display_name;
            userStreams.push(displayName);
        }
        for(var i = 0; i < userStreams.length; i++){
            var name;
            $.getJSON(usersUrl + userStreams[i], function(jsonUser){
                var userLogo = jsonUser.logo;
                if(userLogo === null){ userLogo = "https://upload.wikimedia.org/wikipedia/commons/3/31/ProhibitionSign2.svg"};
                var userName = jsonUser.display_name;
                $.getJSON(streamUrl + userName, function(jsonUserStatus){
                    userStatus = jsonUserStatus.stream;
                    if(userStatus === null){
                        userStatus = offLine(userName.toLowerCase()) + 'Off Line</a>';
                    }
                    else{
                        userStatus = onLine(userName.toLowerCase()) + 'On Line</>';
                    }
                    $("#streams").prepend('<div class="row">' + 
                                           '<div class="col-md-1"><img src="' + userLogo + '" alt="No Logo"></div>' + 
                                            '<div class="col-md-2">' + userName + '</div>' +
                                            '<div class="col-md-6">' + userStatus + '</div>' +
                                            '</div>');
                });
            });
        }
    });
});
