const OMDbUtils = require('../utils/OMDbUtils');
const ResponseUtils = require('../utils/ResponseUtils');
const ErrorCodes = require('../utils/ErrorCodes');
const { processData } = require('../utils/ResponseUtils');

exports.getInfo = async (req, res) => {
    const body = req;
    var data;
    if(!body.title || !body.year){
        return ResponseUtils.process400(res);
    }
    try{
        data = await OMDbUtils.getInfoByTitleAndYear(title, year);
    }catch(e){
        console.error("Error in finding the movie");
        return ResponseUtils.process500(res);
    }
    return ResponseUtils.processData(res,data);
}