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

    return {
        getGeneralRecommendations
    };

}

module.exports = RecommendationUtils;