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

            var concerts = response.data;

            concerts.forEach(function(element) {

                if (element.venue.region) {
                    console.log(element.venue.name + "\n" + element.venue.city + ", " + element.venue.region + ", " + element.venue.country + "\n" + moment(element.datetime).format("MM/DD/YYYY") + "\n");
                } else {
                    console.log(element.venue.name + "\n" + element.venue.city + ", " + element.venue.country + "\n" + moment(element.datetime).format("MM/DD/YYYY") + "\n");
                }
                
            })
            
    })
    break;
    case "spotify-this-song":

    spotify.search({ type: 'track', query: userSearch }).then(function(response) {
       
        var songs = response.tracks.items;
        
        songs.forEach(function(element){

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

    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + userSearch;

    axios.get(queryURL).then(function(response){
        
        var movie = response.data;

        console.log(movie.Title + "\n" + movie.Year + "\n" + movie.Country + "\n" + movie.Language + "\n" + movie.Plot + "\n" + movie.Actors + "\n" + movie.Ratings[0].Source + ": " + movie.Ratings[0].Value + "\n" + movie.Ratings[1].Source + ": " + movie.Ratings[1].Value + "\n");
        
    })
    
    break;
    case "do-what-it-says":
    console.log("You're searching for something");
    break;
    default:
    console.log("I don't know.");
    break;
}