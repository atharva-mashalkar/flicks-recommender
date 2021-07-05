import {
    TOGGLE_SIGNUP_DRAWER,
    TOGGLE_LOGIN_DRAWER,
    REGISTER_USER,
    FAILED_USER_REQUEST,
    REQUEST,
    CLEARING_PROPS,
    LOGIN_USER
} from './userType'
import { Recommender } from '../../utils/apiHitHelpers'

export const clearProps = () => (dispatch) => {
    dispatch({
        type:CLEARING_PROPS,
        payload:true
    })
}

export const toggleSignupDrawer = (open) => (dispatch) => {
    dispatch({
        type:TOGGLE_SIGNUP_DRAWER,
        payload:open
    })
}

export const toggleLoginDrawer = (open) => (dispatch) => {
    dispatch({
        type:TOGGLE_LOGIN_DRAWER,
        payload:open
    })
}

export const registerUser = (data) => (dispatch) => {
    dispatch({
        type: REQUEST,
        payload: true
    })
    let succFunc = (res) => {
        dispatch({
            type: REGISTER_USER,
            payload: res.data
        });
    };
    let failureFunc = (err) => {
        dispatch({
            type: FAILED_USER_REQUEST,
            payload: err.response.data
        });
    };
    Recommender.post("/public/signup",data, succFunc, failureFunc);
}

export const loginUser = (data) => (dispatch) => {
    dispatch({
        type: REQUEST,
        payload: true
    })
    let succFunc = (res) => {
        let token = res.data.data.token;
        delete res.data.data.token
        dispatch({
            type: LOGIN_USER,
            payload: {token , user: res.data.data} 
        });
    };
    let failureFunc = (err) => {
        dispatch({
            type: FAILED_USER_REQUEST,
            payload: err.response.data
        });
    };
    Recommender.post("/public/login",data, succFunc, failureFunc);
}