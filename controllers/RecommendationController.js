const ResponseUtils = require('../utils/ResponseUtils');
const ErrorCodes = require('../utils/ErrorCodes');
const RecommendationUtils = require("../utils/RecommendationUtils")();
const OMDbUtils = require("../utils/OMDbUtils")();
const fs = require('fs');

exports.getGeneralRecommendations = async(req, res) => {
    var data = {}
    try{
        data = JSON.parse(fs.readFileSync('utils/GeneralRecommendations.json'))
    }catch(e){
        console.error("Error in finding General Recommendations file: ", e);
        return ResponseUtils.process500(res);
    }
    return ResponseUtils.processData(res, data);

}
