const ErrorCodes = require('./ErrorCodes')

const ResponseUtils = {
    process500 : (res, msg, errorCode) => {
        return res.status(500).json({success: false,
             msg: msg ? msg : ErrorCodes.SOMETHING_WENT_WRONG.errorMessage, 
             errorCode: errorCode ? errorCode : ErrorCodes.SOMETHING_WENT_WRONG.errorCode});
    },
    process400 : (res, msg, errorCode) => {
        return res.status(400).json({success: false, 
            msg: msg ? msg: ErrorCodes.BAD_REQUEST_ERROR.errorMessage, 
            errorCode: errorCode ? errorCode:ErrorCodes.BAD_REQUEST_ERROR.errorCode});
    },
    process404 : (res, msg, errorCode) => {
        return res.status(404).json({success: false, 
            msg: msg ? msg: ErrorCodes.NOT_FOUND_ERROR.errorMessage, 
            errorCode: errorCode ? errorCode:ErrorCodes.NOT_FOUND_ERROR.errorCode});
    },
    process401 : (res, msg, errorCode) => {
        return res.status(401).json({success: false, 
            msg: msg? msg: ErrorCodes.UNAUTHORIZED.errorMessage, 
            errorCode: errorCode ? errorCode : ErrorCodes.UNAUTHORIZED.errorCode});
    },
    processData : (res, data) => {
        return res.status(200).json({success: true, data });
    }
}

module.exports = ResponseUtils;