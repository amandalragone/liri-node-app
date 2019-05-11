//Requiring files and libraries that will be used.

require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require("fs");

//Global vars
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");
var queryURL;

//Function that will make a call to search the Bands In Town API. After running, it will return the concert venue name, city, state, country and date.

function getConcert() {
    
    axios.get(queryURL).then(
        function(response){

            var concerts = response.data;

            concerts.forEach(function(element) {

                if (element.venue.region) {
                    console.log("Venue name: " + element.venue.name + "\nLocation: " + element.venue.city + ", " + element.venue.region + ", " + element.venue.country + "\nDate: " + moment(element.datetime).format("MM/DD/YYYY") + "\n");
                } else {
                    console.log("Venue name: " + element.venue.name + "\nLocation: " + element.venue.city + ", " + element.venue.country + "\nDate: " + moment(element.datetime).format("MM/DD/YYYY") + "\n");
                }
                
            })
            
    }).catch(function(err){

        console.log("Ops, an error occurred: " + err);
    })

}

//Function that will make a call to search Spotify. After running, it will return the artist, album, name of the song, and a URL.

function getSong() {
    spotify.search(options).then(function(response) {

        var songs = response.tracks.items;
        
        songs.forEach(function(element){

            element.artists.forEach(function(e){
                artist = e.name;
            })
            
            if (element.preview_url === null) {
                console.log("Band/Artist name: " + artist + "\nSong: " + element.name + "\nAlbum: " + element.album.name + "\nURL: " + element.external_urls.spotify + "\n");
            } else {
                console.log("Band/Artist name: " + artist + "\nSong: " + element.name + "\nAlbum: " + element.album.name + "\nURL: " + element.preview_url + "\n");
            }
            
        });

    }).catch(function(err){
        console.log("Oops, it looks like an error occurred: " + err);
    });

}

//Function that will make a call to search the OMDB API. After running, it will return the movie title, year, country, language, movie plot, actors, as well as ratings in IMDB and Rotten Tomatoes.

function getMovie() {

    axios.get(queryURL).then(function(response){
        
        var movie = response.data;

        console.log("Title: " + movie.Title + "\nYear: " + movie.Year + "\nCountry: " + movie.Country + "\nLanguage: " + movie.Language + "\nPlot: " + movie.Plot + "\nActors: " + movie.Actors + "\n" + movie.Ratings[0].Source + ": " + movie.Ratings[0].Value + "\n" + movie.Ratings[1].Source + ": " + movie.Ratings[1].Value + "\n");
        
    }).catch(function(err) {
        console.log("An error occurred: " + err);
    })

}

//Defining what will be the query URL based on which command the user picks.

switch (command) {
    case "concert-this":
        
        if (userSearch) {
            queryURL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp";
        } else {
            queryURL = "https://rest.bandsintown.com/artists/taylor+swift/events?app_id=codingbootcamp";
        }
        
        getConcert();
    
    break;

    case "spotify-this-song":

        if(userSearch) {
            options = { type: 'track', query: userSearch };
        } else {
            options = { type: 'track,artist' , query: 'The Sign,Ace of Base' };
        }
        
        getSong();
    
    break;

    case "movie-this":
       
        if (userSearch) {
            queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + userSearch;
        } else {
            queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=mr+nobody";
        }

        getMovie();
    
    break;

    //If the user picks do-what-it-says, the file random.txt will be read and the search will be based on what's written in it.
    
    case "do-what-it-says":

        fs.readFile("random.txt", "utf-8", function(error, data) {

            if (error) return console.log (error);

            var newSearch = data.split(",");

            if (newSearch[0] === "concert-this") {
                queryURL = "https://rest.bandsintown.com/artists/" + newSearch[1] + "/events?app_id=codingbootcamp";
                getConcert();
            } else if (newSearch[0] === "spotify-this-song") { 
                options = { type: 'track', query: newSearch[1] };
                getSong();
            } else if (newSearch[0] === "movie-this") {
                queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + newSearch[1];
                getMovie();
            }

        }) 

    break;

    //If no command is chosen, or if it's typed incorrectly, this error message will be thrown:

    default:
        
        console.log("Please specify your search. You can choose one of the following commands: movie-this, spotify-this-song, concert-this, or do-what-it-says.");
    
    break;
}