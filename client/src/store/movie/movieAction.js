import {
    FAILED_REQUEST,
    FETCH_GENERAL_RECOMMENDATIONS_SUCCESS,
    FETCH_MOVIE_REQUEST,
    FETCH_OMDB_REQUEST,
    FETCH_OMDB_REQUEST_SUCCESS
} from './movieType';
import { nodeRequest, pyRequest, omdbRequest } from '../../utils/apiHitHelpers'

// API request for "/home" route of Python
export const getGenralRecommendations = () => (dispatch) => {
    dispatch({
        type: FETCH_MOVIE_REQUEST,
        payload: true
    })
    let succFunc = (res) => {
        dispatch({
            type: FETCH_GENERAL_RECOMMENDATIONS_SUCCESS,
            payload: res.data
        });
    };
    let failureFunc = (err) => {
        dispatch({
            type: FAILED_REQUEST,
            payload: true
        });
        console.log(err);
    };
    pyRequest.get("/home", succFunc, failureFunc);
}

// API request to get info from OMDb
export const getMovieInfo = (title, year, genre) => (dispatch) => {
    title = title.split(" ")
    title = "+".join(title)
    console.log(title)
    dispatch({
        type: FETCH_OMDB_REQUEST,
        payload: genre
    })
    let succFunc = (res) => {
        dispatch({
            type: FETCH_OMDB_REQUEST_SUCCESS,
            payload: res.data
        });
    };
    let failureFunc = (err) => {
        dispatch({
            type: FAILED_REQUEST,
            payload: err
        });
        console.log(err);
    };
    omdbRequest.get(`t=${title}&y=${year}`, succFunc, failureFunc);
}
