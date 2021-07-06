import {
    TOGGLE_SIGNUP_DRAWER,
    TOGGLE_LOGIN_DRAWER,
    REGISTER_USER,
    FAILED_USER_REQUEST,
    REQUEST,
    CLEARING_PROPS,
    LOGIN_USER,
    USER_LOGGED_OUT
} from './userType'

const initialState = {
    openSignupDrawer:false,
    openLoginDrawer:false,
    failed_req : null,
    processing_reg: false,
    req_success: false,
    userInfo:null,
    token:null
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type){
        case TOGGLE_SIGNUP_DRAWER:
            return{
                ...state,
                openSignupDrawer : payload,
            };
        case TOGGLE_LOGIN_DRAWER:
            return{
                ...state,
                openLoginDrawer : payload,
            };
        case LOGIN_USER:
            return{
                ...state,
                userInfo:payload.user,
                token:payload.token,
                failed_req:null,
                processing_reg: false
            }
        case REGISTER_USER:
            return{
                ...state,
                processing_reg:false,
                req_success:true,
                failed_req:null,
            };
        case FAILED_USER_REQUEST:
            return{
                ...state,
                processing_reg:false,
                failed_req:payload
            };
        case REQUEST:
            return{
                ...state,
                processing_reg: payload,
                req_success:false,
                failed_req:null
            };
        case CLEARING_PROPS:
            return{
                ...state,
                openSignupDrawer:false,
                openLoginDrawer:false,
                failed_req : null,
                processing_reg: false,
                req_success: false
            };
        case USER_LOGGED_OUT:
            return{
                ...state,
                openSignupDrawer:false,
                openLoginDrawer:false,
                failed_req : null,
                processing_reg: false,
                req_success: false,
                userInfo:null,
                token:null
            }
        default:
            return state
    };
};
