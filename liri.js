
require("dotenv").config();
var keys = require("./keys")
// console.log(keys)
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
// var omdb = require('omdb');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var fs= require("fs");
// console.log(spotify)
// console.log(client)

// * `my-tweets`


// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`



var programToRun = process.argv[2]

function runApi(command, searchTerm){
    switch(command){
        case "my-tweets":
        myTweets();
        break;
       
        case "spotify-this-song":
        spotifyThisSong(searchTerm);
        break;

        case "movie-this":
        movieThis(searchTerm);
        break;

        case "do-what-it-says":
        doWhatItSays();
        break;

        default:
        console.log("please give me a command");
        break;
    }
}

// console.log(programToRun)
// if (programToRun == "my-tweets") {
//     myTweets()
// }

// else if (programToRun == "spotify-this-song") {
//     spotifyThisSong("all the small things")
// }

// else if (programToRun == "movie-this") {
//     movieThis()

// }

// else if (programToRun == "do-what-it-says") {
//     doWhatItSays()

// }

// else {
//     console.log("please specify a program")
// }

function myTweets() {
    console.log("runningtwitterprogram")
}

// need app to be able to pass in a value through terminal
// spotify app section
function spotifyThisSong(searchTerm) {

    console.log(searchTerm)

    if(!searchTerm){
        searchTerm = "The Sign";
    }

    spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);

    });


}

//twitter app section
//this section works 

function myTweets() {
    //Display last 20 Tweets
    var screenName = { screen_name: 'Dunk5423' };
    client.get('statuses/user_timeline', screenName, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log("@Dunk5423 " + tweets[i].text + " Created At: " + date.substring(0, 19));
                console.log("-----------------------");


            }
        } else {
            console.log('Error occurred');
        }
    });
}

//OMDB search function






function movieThis(searchTerm) {

    console.log(searchTerm);

    if(!searchTerm){
        searchTerm = "Mr. Nobody";
    }

    var request = require("request");

    // Store all of the arguments in an array
     var nodeArgs = process.argv;
    
    // Create an empty variable for holding the movie name
    var movieName = searchTerm;
    
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    // for (var i = 2; i < nodeArgs.length; i++) {
    
    //   if (i > 2 && i < nodeArgs.length) {
    
    //     movieName = movieName + "+" + nodeArgs[i];
    
    //   }
    
    //   else {
    
    //     movieName += nodeArgs[i];
    
    //   }
    //}
    
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);
    
    request(queryUrl, function(error, response, body) {
    
      // If the request is successful
      if (!error && response.statusCode === 200) {

        // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
    
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Rating: "+ JSON.parse(body).Rated);
        console.log("Rotten Tomatoes: "+ JSON.parse(body).Ratings[1].Value);
        console.log("Country: "+ JSON.parse(body).Country);
        console.log("Language: "+ JSON.parse(body).Language);
        console.log("Plot: "+ JSON.parse(body).Plot);
        console.log("Actors: "+ JSON.parse(body).Actors);
        //console.log(JSON.parse(body));
      }
    })
};

var searchArray = process.argv.slice(3);

function getSearchTerm(array){
    var term = "";

    for(var i = 0; i < array.length; i++){
        term += " " + array[i];
        // term = term + " " + array[i];
    }

    return term;
}

function doWhatItSays(){
fs.readFile("random.txt", "utf8", function(err, data){
    if (err)throw err;
    // console.log(data);


    // console.log(data.split(",")[1]);

    var dataArray = data.split(",");

    var doCommand = dataArray[0];

    var doSearch = dataArray[1].trim();

    console.log(doCommand);
    console.log(doSearch);
    runApi(doCommand, doSearch);
})
}

runApi(process.argv[2],getSearchTerm(searchArray));