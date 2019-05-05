require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');

// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

var userSearch = process.argv[3];

switch (command) {
    case "concert-this":
    var queryURL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function(response){

            response.data.forEach(function(element) {
                console.log(element.venue.name + "\n" + element.venue.city + ", " + element.venue.region + ", " + element.venue.country + "\n" + moment(element.datetime).format("MM/DD/YYYY") + "\n");
            })
            
    })
    break;
    case "spotify-this-song":
    console.log("You're searching for a song");
    break;
    case "movie-this":
    console.log("You're searching for a movie");
    break;
    case "do-what-it-says":
    console.log("You're searching for something");
    break;
    default:
    console.log("I don't know.");
    break;
}