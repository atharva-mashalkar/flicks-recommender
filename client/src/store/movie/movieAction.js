import {
    FAILED_REQUEST,
    FETCH_GENERAL_RECOMMENDATIONS_SUCCESS,
    FETCH_MOVIE_REQUEST,
} from './movieType';
import { Recommender } from '../../utils/apiHitHelpers'

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
        console.log(res);
    };
    let failureFunc = (err) => {
        dispatch({
            type: FAILED_REQUEST,
            payload: true
        });
        console.log(err);
    };
    Recommender.get("/public/general-recommendations", succFunc, failureFunc);
}