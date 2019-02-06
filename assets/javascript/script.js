$(document).ready(function() {

    var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",  "capybara", "teacup pig", "serval", "salamander", "frog"];
    
    //display all animal buttons in html
    function displayAnimalButtons() {
        $("#animal_options").empty();

        for (var i = 0; i < animals.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("animals_array");
            gifButton.attr("data-name", animals[i]);
            gifButton.text(animals[i]);
            $("#animal_options").append(gifButton);
        }
    }
    
    //add new animal from input and add to animal buttons
    function addNewAnimal() {
        $("#add_animal").on("click", function() {

            var newAnimal = $("#animal_input").val().trim();

            if (newAnimal == "") {
                return false; 
            }

            animals.push(newAnimal);
            displayAnimalButtons();
            return false;
            });
    }
    
    //generate gifs of clicked animal button
    function displayGifs() {
        
        var newAnimal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newAnimal + "&api_key=dc6zaTOxFJmzC&limit=10";
        // console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            // console.log(response); 
            $("#animal_gifs").empty(); 
            var results = response.data;

            if (results == "") {
              alert("404 Not Found");
            }

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gif_div");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#animal_gifs").prepend(gifDiv);
            }
        });
    }

    displayAnimalButtons(); 
    addNewAnimal();
    
    $(document).on("click", ".animals_array", displayGifs);
    //if images state still set it to animated else set to still
    $(document).on("click", ".image", function() {
        var state = $(this).attr("data-state");
        
        if (state == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });
});