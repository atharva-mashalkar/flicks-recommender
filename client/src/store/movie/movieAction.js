import {
    FAILED_REQUEST,
    FETCH_GENERAL_RECOMMENDATIONS_SUCCESS,
    FETCH_MOVIE_REQUEST,
    GET_ALL_TOP_MOVIES,
    GET_RECOMMENDATIONS,
    GET_RECOMMENDATIONS_SUCCESS,
    GET_RECOMMENDATIONS_FAILURE,
    SELECTED_MOVIE
} from './movieType';
import { Recommender } from '../../utils/apiHitHelpers'

export const selectMovie = (movie) => (dispatch) => {
    dispatch({
        type:SELECTED_MOVIE,
        payload:movie
    });
};

// API request for "/home" route of Python
export const getGeneralRecommendations = () => (dispatch) => {
    dispatch({
        type: FETCH_MOVIE_REQUEST,
        payload: true
    })
    let succFunc = (res) => {
        dispatch({
            type: FETCH_GENERAL_RECOMMENDATIONS_SUCCESS,
            payload: res.data.data
        });
    };
    let failureFunc = (err) => {
        dispatch({
            type: FAILED_REQUEST,
            payload: err.response.data
        });
    };
    Recommender.get("/public/general-recommendations", succFunc, failureFunc);
}

export const getAllTopMovies = () => (dispatch) => {
    dispatch({
        type: FETCH_MOVIE_REQUEST,
        payload: true
    })
    let succFunc = (res) => {
        dispatch({
            type: GET_ALL_TOP_MOVIES,
            payload: res.data.data
        });
    };
    let failureFunc = (err) => {
        dispatch({
            type: FAILED_REQUEST,
            payload: err.response.data
        });
    };
    Recommender.get("/private/get-all-top-movies", succFunc, failureFunc);
}

export const getPersonalizedRecommendations = (data) => (dispatch) => {
    dispatch({
        type: GET_RECOMMENDATIONS,
        payload: true
    })
    let succFunc = (res) => {
        dispatch({
            type: GET_RECOMMENDATIONS_SUCCESS,
            payload: res.data.data
        });
    };
    let failureFunc = (err) => {
        dispatch({
            type: GET_RECOMMENDATIONS_FAILURE,
            payload: err
        });
    };
    Recommender.post("/private/get-personal-recommendations", data, succFunc, failureFunc);
}

export const rateMovie = (data) => {
    Recommender.post("/private/save-rating", data);
}