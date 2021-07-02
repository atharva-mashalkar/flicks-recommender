import {
    TOGGLE_SIGNUP_DRAWER,
    TOGGLE_LOGIN_DRAWER
} from "./userType";

const initialState = {
    openSignupDrawer:false,
    openLoginDrawer:false
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
        default:
            return state
    };
};
