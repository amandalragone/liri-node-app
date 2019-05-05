require("dotenv").config();

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

// var userSearch = process.argv[3];

switch (command) {
    case "concert-this":
    console.log("You're searching for a concert");
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