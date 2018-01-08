// Create global variables including a topics array
var topics = ["drake", "kanye west", "lil uzi vert", "katy perry", "eminem", "lana del rey", "bella hadid", "kylie jenner", "tyler the creator", "pusha t", "lil pump", "wiz khalifa"];
var NFLteamsearched = [];
var rating = "r"
var limit = 20;

$(document).ready(function() {
  // Create button equal to each topic currently in the array. Set current buttons value = topics array
  function buttons(array) {
    $.each(array, function(x, NFLteam) {
      // Add a <button>, an id = searchTerm, and a value = searchTerm
      var teamButton = $("<button>");
      teamButton.attr({
        id: NFLteam,
        class: "searchTeam .btn-default .btn-md",
        value: NFLteam,
      });

      teamButton.append(NFLteam);
      $("#gifButtons").append(teamButton);
    });
  };

  // Generate the initial buttons
  buttons(topics);

  $("#searchForm").submit(function(event) {
    event.preventDefault();

    // push the NFLteam searched and push it. .trim elliminates spaces
    NFLteamsearched.push($("#searchInput").val().trim());
    console.log(NFLteamsearched);
    buttons(NFLteamsearched);

    // clear search value
    $("#searchInput").val("");
  });

  // Set up up the queryURL that including the website, api key, search item, and limit to 10
  // when a user selects a gif use ajax and get to get gifs from the query URL
  $("#gifButtons").on("click", ".searchTeam", function() {
    var team = this.id;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&rating=" + rating + "&api_key=epXrWj2I8U7N8117ommFu0V50Nw01qSB" + "&limit=" + limit;
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
        $("#gifImages").empty();
        NFLteamdata = response.data;
        $.each(NFLteamdata, function(i) {
          var createcontainer = $("<div class='imgContainer'>");
          var ratingHTML = $("<p>").text("Rating: " + NFLteamdata[i].rating);
          var imageHTML = $("<img class=gifimage>");
          imageHTML.attr("src", NFLteamdata[i].images.fixed_height_still.url);
          imageHTML.attr("data-still", NFLteamdata[i].images.fixed_height_still.url);
          imageHTML.attr("data-animate", NFLteamdata[i].images.fixed_height.url);
          imageHTML.attr("data-state", "still");
          // putting everything in the container
          createcontainer.append(ratingHTML);
          createcontainer.append(imageHTML);
          $("#gifImages").append(createcontainer);
        });

        // When user selects a gif play that gif. If the user selects it again stop the gif.
        $(".gifimage").on("click", function() {
          var state = $(this).attr('data-state');
          if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
          } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
          }
        });
      });
  });
}); //end of ready function
