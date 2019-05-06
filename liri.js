require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

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

    spotify.search({ type: 'track', query: userSearch }).then(function(response) {
       
        var details = response.tracks.items;
        
        details.forEach(function(element){

            element.artists.forEach(function(e){
                artist = e.name;
            })
            
            if (element.preview_url === null) {
                console.log(artist + "\n" + element.name + "\n" + element.album.name + "\n" + element.external_urls.spotify + "\n");
            } else {
                console.log(artist + "\n" + element.name + "\n" + element.album.name + "\n" + element.preview_url + "\n");
            }
            
        });
      });

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