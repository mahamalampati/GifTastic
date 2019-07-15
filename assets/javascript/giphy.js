
var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
var results;


// Function for displaying movie buttons
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#giphy-buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("movie");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", movies[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(movies[i]);
        // Adding the button to the HTML
        $("#giphy-buttons").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-movie").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var movie = $("#movie-input").val().trim();
    // The movie from the textbox is then added to our array
    movies.push(movie);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();



$(document).on("click", ".movie", diaplaygiphy);

function diaplaygiphy() {
    
    $("button").on("click", function () {
        
        // In this case, the "this" keyword refers to the button that was clicked
        var giphy = $(this).attr("data-name");
        
        // Constructing a URL to search Giphy for the name of the movie 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"

        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .then(function (response) {
                // Storing an array of results in the results variable
                results = response.data;
                console.log(results)
              
              
                $("#images").empty();
                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    
                    // Creating a div for the gif
                    var gifDiv = $("<div>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                


                    // Creating and storing an image tag in a variable Image
                    var Image = $("<img>");

                    // Setting the Image src attributes to imageUrl
                    Image.attr("src", results[i].images.fixed_height_still.url);
                    // Setting the Image datastill and dataanimate and datastate attributes
                    Image.attr("data-still", results[i].images.fixed_height_still.url);
                    Image.attr("data-animate",results[i].images.original.url);
                    Image.attr("alt", "image");
                    Image.attr("data-state", "still");
                    // Adding a class to the Images that are generated so we can use the class for onclick function
                    Image.addClass("gif");

                    // Appending the paragraph and Image we created to the "gifDiv" div we created
                
                    gifDiv.append(p);
                    gifDiv.append(Image);

                    // A  ppending  the gifDiv to the "#images" div in the HTML
                    $("#images").append(gifDiv);


                   
                }
                // calling the onload function to pause and play the images
                onload();
                });   
    });
 }
           // creating a function onload() to play and pause gif's
            function onload(){

              $(".gif").click(function() {

                console.log(results);
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
              var state = $(this).attr("data-state");
              // If the clicked image's state is still, update its src attribute to what its data-animate value is.
             // Then, set the image's data-state to animate
               // Else set src to the data-still value and the data-state to still
               for (var i = 0; i < results.length; i++) {
               if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
               $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", results[i].images.fixed_height_still.url);
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
                    }

               }
      
            });
       

        }

    // to reset the page
     function reset(){
    // emptying the elements in the images div to load the new results when the buttons are clicked
    $("#images").empty();
    }