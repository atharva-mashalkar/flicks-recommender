const axios = require('axios').default;
const Q = require('q');
const { OMDb } = require('../config/apiURL');

const OMDbUtils = () => {
    
    const getInfoByTitleAndYear = (title, year) => {
        const deferred = Q.defer();
        title = title.split(" ").join("+")
        axios.get(OMDb.baseURL+`t=${title}&y=${year}`)
        .then(response => {
            deferred.resolve(response.data);
        })
        .catch(err => {
            deferred.resolve(err);
        })
        return deferred.promise;
    };

    return {
        getInfoByTitleAndYear
    };

};

module.exports = OMDbUtils