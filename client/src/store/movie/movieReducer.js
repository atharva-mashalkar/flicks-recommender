import {
    FAILED_REQUEST,
    FETCH_GENERAL_RECOMMENDATIONS_SUCCESS,
    FETCH_MOVIE_REQUEST,
    USER_LOGGED_OUT
} from './movieType';

const initialState = {
    failedRequest : false,
    loading: false,
    moviesInfo : null
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type){
        case FETCH_GENERAL_RECOMMENDATIONS_SUCCESS:
            return{
                ...state,
                moviesInfo : payload,
                loading : false
            };
        case FETCH_MOVIE_REQUEST:
            return{
                ...state,
                loading : payload
            };
        case FAILED_REQUEST:
            return{
                ...state,
                failedRequest : payload,
                loading : false
            };
        case USER_LOGGED_OUT:
            return{
                ...state,
                failedRequest : false,
                loading: false,
            }
        default:
            return state;
    }
}