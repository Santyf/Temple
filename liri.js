require("dotenv").config();
var axios = require("axios")
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");
 
var userInput = process.argv[2];
var userSearch = process.argv.slice(3).join("");

function switchData() {
    switch (userInput) {

        case "movie-this":
            getMovie(userSearch);
            break;



        case "spotify-this-song":
            getSpotify(userSearch);
            break;

        case "concert-this":
            getConcert();
            break;

        case "do-what-it-says":
            doThis();
            break;
            
            default:
                console.log("Please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'");
    }

}

function getSpotify(song) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: song }, function (error, data) {
        if (error) {
            return console.log(error)
        }
        else if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var Data = data.tracks.items[i];

                console.log("Artist: " + Data.artists[0].name);

                console.log("Song: " + Data.name);

                console.log("Preview URL: " + Data.preview_url);

                console.log("Album: " + Data.album.name);
                console.log("-----------------------");
            }
        }

    }
    )};



function getConcert() {
    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("Name of the venue: " + response.data[0].venue.name);
            console.log("Venue Loacation: " + response.data[0].venue.city);
            console.log("Date of Event: " + moment(response.data[0].datetime).format("MM-DD-YYYY")

            )
        }

    )
};

function getMovie(movie) {
    if (!movie) {
        movie = 'Mr.Nobody';
    }



    axios.request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("Title of the Movie: " + response.data.Title);
            console.log("Year the Movie came out: " + response.data.Year);
            console.log("The movie's rating is: " + response.data.imdbRating);
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
            console.log("Country where movie was produced: " + response.data.Country);
            console.log("Language of movie: " + response.data.Language);
            console.log("Plot of the Movie: " + response.data.Plot);
            console.log("Actors in the Movie: " + response.data.Actors);

        }

    )
};

function doThis(){
    fs.readFile('random.txt', "utf8", function(error, data) {
        if(error) {
         return console.log(error);
        }

        else {
             console.log(data);
            var txt = data.split(",");

             }
      
           

    })
};
  




switchData(userInput, userSearch);

