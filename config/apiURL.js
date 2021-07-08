const OMDb = {
    baseURL:"http://www.omdbapi.com/?apikey=867e4d01&", //atharvamashalkar1821
    // baseURL: " http://www.omdbapi.com/?apikey=e46e6528&" //vandanamashalkar12
    // posterURL:"http://img.omdbapi.com/?apikey=867e4d01&"
};

const Recommender = {
    // baseURL:"http://localhost:5000"
    baseURL : "https://recommend-py.herokuapp.com"
} 

module.exports = {
    OMDb,
    Recommender
};