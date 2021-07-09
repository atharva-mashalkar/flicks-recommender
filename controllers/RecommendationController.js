const ResponseUtils = require('../utils/ResponseUtils');
const RecommendationUtils = require("../utils/RecommendationUtils")();
const OMDbUtils = require("../utils/OMDbUtils")();
const DBUtils = require('../utils/DBUtils')();
const fs = require('fs');
const User = require("../models/User");

exports.getGeneralRecommendations = async(req, res) => {
    var data = {}
    try{
        let fileData = JSON.parse(fs.readFileSync('utils/GeneralRecommendations.json'))
        Object.keys(fileData).map(genre => {
            data[genre] = fileData[genre].slice(0,10)
        });
    }catch(e){
        console.error("Error in finding General Recommendations file: ", e);
        return ResponseUtils.process500(res);
    }
    return ResponseUtils.processData(res, data);

}

exports.getAllTopMovies = async(req, res) => {
    var data = {}
    try{
        data = JSON.parse(fs.readFileSync('utils/GeneralRecommendations.json'));
    }catch(e){
        console.error("Error in finding General Recommendations file: ", e);
        return ResponseUtils.process500(res);
    }
    return ResponseUtils.processData(res, data);
}

exports.givePersonalizedRecommendations = async(req, res) => {
    var data = {};
    let { moviesRated } = req.body;
    let user = req.user;

    try{
        user = await DBUtils.getEntityForId(User, user.id);
        if(user.moviesRated.length == 0 && moviesRated){
            await DBUtils.updateEntity(User, {_id:user.id},{moviesRated});
        }
        else{
            moviesRated = user.moviesRated;
        }
        movieIds = []
        genreSelected = {}
        moviesRated.forEach(movie =>{
            genreSelected[movie.genre] = 1
            movieIds.push(movie.movieId)
        });
        let movieData = await RecommendationUtils.getRecommendationsByMovieID(
            user.uid,movieIds,
            Object.keys(genreSelected),
            user.savedToDataSet
        )
        NUM_OF_MOVIES_TO_DISPLAY = 9
        for (const property in movieData) {
            let l = []
            var k = 1
            if (property=="recommendations"){
                k = Math.floor(movieData[property].length/9);
            }
            for (let i = 0; i < movieData[property].length; i += k) {
                film = await OMDbUtils.getInfoByTitleAndYear(movieData[property][i][0], movieData[property][i][1]);
                if(film['Response']==="True"){
                    film['movieId'] = movieData[property][i][2];
                    l.push(film);
                };
            };
            console.log(`${l.length} movies found out of ${NUM_OF_MOVIES_TO_DISPLAY} under ${property} category`);
            if(property=="recommendations"){
                data["Movies Recommended For You"] = l;
            }
            else if(property=="genreBasedRecommendations"){
                data["Other popular movies belonging to the same genres"] = l;
            }
            else{
                data["Few Popular Movies"] = l;
            }
        }
    }catch(error){
        console.error("Error in finding Personal Recommendations: ", error);
        return ResponseUtils.process500(res);
    }

    return ResponseUtils.processData(res, data);
}