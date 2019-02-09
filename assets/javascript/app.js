$(document).ready(function(){
        
	  var CelebFav = ["Beyoncé","Eddie Redmayne", "Jimmy Fallon","James Corden","Chadwick Boseman","Benedict Cumberbatch"];
      function displayCelebFavhow() {
        var Celeb = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + Celeb + "&api_key=5CBjAWDNTayUw2SIdnUXbSmXWCBSb67Q&limit=10";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response){
          $("#Celebview").empty();
          var results = response.data;
          // Retrieves the Rating Data
          // Loops the Celeb for limit 10
          for(var i = 0; i < results.length; i++) {

            // Creates a div to hold the Celeb
            var CelebDiv = $("<div>");
            // Make the class for style.css
            CelebDiv.addClass("Celebpictures");
            // Creates an element to have the rating displayed
            var rating = results[i].rating;
            var p = $("<h2>").text("Rating: " + rating);

            // The Images can still or animate to call the class "CelebImage" for click.
            var CelebImage = $("<img>");
            CelebImage.attr("src", results[i].images.fixed_height_still.url);
            CelebImage.attr("data-still", results[i].images.fixed_height_still.url);
            CelebImage.attr("data-animate", results[i].images.fixed_height.url);
            CelebImage.attr("data-state", "still");
            CelebImage.addClass('CelebImage');

            // Displays the rating
            CelebDiv.prepend(p);

            // Displays the Celeb Image
            CelebDiv.prepend(CelebImage);
            $("#Celebview").prepend(CelebDiv);
          }

         
          $(".CelebImage").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(state);

            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        });        
      }

      // Function for displaying Celeb data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#Celebbuttons").empty();

        for(var i = 0; i < CelebFav.length; i++) {

          
          var CelebAdd = $("<button>");

          // Adds a class of Celeb to our button
          CelebAdd.addClass("Celeb");

          // Added a data-attribute
          CelebAdd.attr("data-name", CelebFav[i]);

          // Provided the initial button text
          CelebAdd.text(CelebFav[i]);

          // Added the button to the buttons-view div
          $("#Celebbuttons").append(CelebAdd);
        }
      }

      // This function handles events where the add Celeb button is clicked
      $("#add-Celeb").on("click", function(event){
        event.preventDefault();

        // This line of code will grab the input from the textbox
        var Celeb = $("#Celeb-input").val().trim();

        // The Celeb from the textbox is then added to our array
        CelebFav.push(Celeb);

        // Calling renderButtons which handles the processing of our Celeb array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "Celeb"
      $(document).on("click", ".Celeb", displayCelebFavhow);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
});

