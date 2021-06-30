const RecommendationUtils = require("../utils/RecommendationUtils")();
const OMDbUtils = require("../utils/OMDbUtils")();
const fs = require('fs');

const getGeneralRecommendations = async () => {
    let data = {}
    try{
        //Getting general recommendations from Python
        const generalRecommendations = await RecommendationUtils.getGeneralRecommendations()
        
        //Getting any 7 movies(unique for all genre) out from the recommended movies
        let movies = {};
        let movieNames = [];
        const NUM_OF_MOVIES_TO_DISPLAY = 50 ;
        for (const property in generalRecommendations) {
            let start = 0;
            let end = start + NUM_OF_MOVIES_TO_DISPLAY;
            movieArr = generalRecommendations[property].slice(start, end);
            movieArr.forEach((movie, index) => {
                if(movieNames.includes(movie)){
                    movieArr.splice(index, 1)
                    movieArr.push(generalRecommendations[property][Math.floor((Math.random() * 30) + 49)])
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
    
        console.log("Writing the GeneralRecommendations.json file")
        fs.writeFileSync( "./GeneralRecommendations.json", JSON.stringify(data), "utf8" )
        console.log("File Ready")
    
    }catch(e){
        console.error("Error in finding General Recommendations : ", e);
        return
    }
}

getGeneralRecommendations()