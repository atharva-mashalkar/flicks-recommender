import {
    TOGGLE_SIGNUP_DRAWER,
    TOGGLE_LOGIN_DRAWER,
    REGISTER_USER,
    FAILED_USER_REQUEST,
    REQUEST,
    CLEARING_PROPS,
    LOGIN_USER,
    USER_LOGGED_OUT,
    TOGGLE_MODAL,
    TOGGLE_MOVIE_MODAL
} from './userType'
import { Recommender } from '../../utils/apiHitHelpers'

export const toggleMovieModal = (value) => (dispatch) => {
    dispatch({
        type:TOGGLE_MOVIE_MODAL,
        payload:value
    })
}

export const toggleModal = (value) => (dispatch) => {
    dispatch({
        type:TOGGLE_MODAL,
        payload:value
    })
}

export const userLogedOut = () => (dispatch) => {
    dispatch({
        type:USER_LOGGED_OUT,
        payload:null
    })
}

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

export const verifyToken = (token) => (dispatch) => {
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
            payload: null
        });
    };
    Recommender.post("/private/verify-token",{token}, succFunc, failureFunc);
}