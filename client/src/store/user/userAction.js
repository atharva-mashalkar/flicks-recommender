import {
    TOGGLE_SIGNUP_DRAWER,
    TOGGLE_LOGIN_DRAWER,
    REGISTER_USER,
    FAILED_REQUEST,
    REQUEST
} from './userType'
import { Recommender } from '../../utils/apiHitHelpers'

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
            payload: res.data.data
        });
    };
    let failureFunc = (err) => {
        dispatch({
            type: FAILED_REQUEST,
            payload: true
        });
        console.log(err);
    };
    Recommender.get("/public/signup", succFunc, failureFunc);
}