$(document).ready(function(){
  //$("#srchForm").submit(function(){
    //return false;
  //});
  $(".srchIcon").hover(function(){
    $(this).css("cursor", "pointer");
  });
  $("#srchField").css("display", "none");
  $(".srchIcon").on("click", function(){
    $("#srchField").toggle("slow", function(){
      $(this).find(":input:visible").first().focus();
    });
  });

  $("#searchTerm").keypress(function(e){
    if(e.which==13){
      $("#search-btn").click();
    }
  });

  $("#search-btn").on("click", function(){
    var searchTerm = $("#searchTerm").val();
    var searchAppiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";
    if(searchTerm != ""){
      $.ajax({
        type: "GET",
        url: searchAppiUrl,
        async: false,
        dataType: "json",
        success: function(json){
          $("#search-results").html("");
          for(i = 0; i < json[1].length; i++){
            $("#search-results").prepend("<div class=\"container\"><a href=\"" + json[3][i] + "\" target=\"blank\">" + json[1][i] + "</a><p>" 
            + json[2][i] + "</p></div>");
          }
          $("#searchTerm").val("");
        },
        error: function(errorMsg){
          alert("Error, Please refresh the page.")
        }
      });
    }
    else{
      alert("Oops! Please enter something in the search box.")
    }
  });
  
  $("#random-btn").on("click", function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });

  $("#close-search").on("click", function(){
    $("#search-results").html("");
    $(".srchIcon").click();
  });
});
