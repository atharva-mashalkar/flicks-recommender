const ResponseUtils = require('../utils/ResponseUtils');
const ErrorCodes = require('../utils/ErrorCodes');
const RecommendationUtils = require("../utils/RecommendationUtils")();
const OMDbUtils = require("../utils/OMDbUtils")();

exports.getGeneralRecommendations = async(req, res) => {

    let data = {}
    try{
        //Getting general recommendations from Python
        const generalRecommendations = await RecommendationUtils.getGeneralRecommendations()
        
        //Getting any 7 movies(unique for all genre) out from the recommended movies
        let movies = {};
        let movieNames = [];
        const NUM_OF_MOVIES_TO_DISPLAY = 7 ;
        for (const property in generalRecommendations) {
            let start = Math.floor((Math.random() * 60) + 1);
            let end = start + NUM_OF_MOVIES_TO_DISPLAY;
            movieArr = generalRecommendations[property].slice(start, end);
            movieArr.forEach((movie, index) => {
                if(movieNames.includes(movie)){
                    movieArr.splice(index, 1)
                    movieArr.push(generalRecommendations[property][Math.floor((Math.random() * 60) + 1)])
                }
            });
            movies[property] = movieArr;
        }

        // Getting OMDb Movie Info for every selected Info
        for (const property in movies){
            let l = []
            for (let i = 0; i < movies[property].length; i++) {
                film = await OMDbUtils.getInfoByTitleAndYear(movies[property][i][0], movies[property][i][1]);
                if(film['Response']==="True"){
                    l.push(film);
                };
            };
            console.log(`${l.length} movies found out of ${NUM_OF_MOVIES_TO_DISPLAY} under ${property} category`);
            data[property] = l
        };

    }catch(e){
        console.error("Error in finding General Recommendations : ", e);
        return ResponseUtils.process500(res);
    }
    
    return ResponseUtils.processData(res, data);
}
