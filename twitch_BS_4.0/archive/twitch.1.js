$(document).ready(function(){

    function prependUserInfo(passedLogo, passedStatus, passedName, passedBio){
        var noLogo = '<div class="col-md-1">No Logo</div>';
        var withLogo = '<div class="col-md-1" style="center"><img src="' + passedLogo + '" alt="no logo"></div>';
        var prependHtml = '';
        var htmlString = '<div class="col-md-2">' + passedStatus + '</div>'+
                         '<div class="col-md-3">' + passedName + '</div>'+
                         '<div class="col-md-5">' + passedBio + '</div>';
        if(passedLogo === null){
            prependHtml = noLogo + htmlString;
        }
        else{
            prependHtml = withLogo + htmlString;
        }
        return prependHtml;
    }
    //ADDED BAD DISPLAY NAMES FOR TESTING
    var following = ["Quixities1","Quixities2","Quixities3"];
    var streamUrl = "https://wind-bow.glitch.me/twitch-api/streams/";
    var usersUrl = "https://wind-bow.glitch.me/twitch-api/users/";
    //GET FCC STATUS
    $.getJSON(streamUrl + "freecodecamp", function(json){
        var fccStatus = json.stream;
        if(fccStatus === null){
            $("#fccStatus").html("Off Line");
        }
        else{
            $("#fccStatus").html("On Line")
        }
    });
    $.getJSON(usersUrl + "freecodecamp", function(json1){
        var fccBio = json1.bio;
        $("#fccBio").html(fccBio);
    });
    $.getJSON("https://wind-bow.glitch.me/twitch-api/users/freecodecamp/follows/channels/", function(json2){
        var numberFollowing = json2._total;
        for(var i = 0; i < json2.follows.length; i++){
            var displayName = json2.follows[i].channel.display_name;
            following.push(displayName);
        }

        for(var i = 0; i < following.length; i++){
            var followerUrl = usersUrl + following[i];

            $.getJSON(followerUrl).done(function(json3){
                
                var logo;
                var status;
                var name;
                var bio = "";
                if(json3.error){
                    logo = "https://upload.wikimedia.org/wikipedia/commons/3/31/ProhibitionSign2.svg";
                    status = json3.error;
                    name = json3.message;
                    $("#results").prepend(prependUserInfo(logo, status, name, bio));
                }
                else{
                    logo = json3.logo;
                    name = json3.display_name;
                    bio = json3.bio;
                    if(bio === null){ bio = ""; }
                    $.getJSON(streamUrl + following[i],function(json4){
                        if(json4.stream === null){
                            status = "Offline";
                        }
                        else{
                            status = "Online";
                        }

                    $("#results").prepend(prependUserInfo(logo, status, name, bio));
                    });
                }
            });
        }
    });
});
