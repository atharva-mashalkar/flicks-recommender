const axios = require('axios').default;
const Q = require('q');
const { Recommender } = require('../config/apiURL');

const RecommendationUtils = () => {
    
    const getGeneralRecommendations = () => {
        const deferred = Q.defer();
        axios.get(Recommender.baseURL + "/home")
        .then(res => {
            deferred.resolve(res.data);
        })
        .catch(err => {
            console.error(`Error in fetching General Recommendations : ${err}`);
            deferred.reject();
        })
        return deferred.promise;
    };

    const getRecommendationsByMovieID = (userId, movieIds, genreSelected, savedToDataSet) => {
        const deferred = Q.defer();
        axios.post(Recommender.baseURL+"/personalized-recommendations",{userId,movieIds,genreSelected, savedToDataSet})
        .then(res => {
            deferred.resolve(res.data);
        })
        .catch(err => {
            console.error(`Error in fetching Personalized Recommendations : ${err}`);
            deferred.reject();
        })
        return deferred.promise;
    }

    const getMovieGenre = (movieId) => {
        const deferred = Q.defer();
        axios.post(Recommender.baseURL+"/get-movie-genre",{movieId})
        .then(res => {
            deferred.resolve(res.data);
        })
        .catch(err => {
            console.error(`Error in finding movie's genre : ${err}`);
            deferred.reject();
        })
        return deferred.promise;
    }

    return {
        getGeneralRecommendations,
        getRecommendationsByMovieID,
        getMovieGenre
    };

}

module.exports = RecommendationUtils;