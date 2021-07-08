import {
    FAILED_REQUEST,
    FETCH_GENERAL_RECOMMENDATIONS_SUCCESS,
    FETCH_MOVIE_REQUEST,
    USER_LOGGED_OUT,
    GET_ALL_TOP_MOVIES,
    GET_RECOMMENDATIONS_FAILURE,
    GET_RECOMMENDATIONS_SUCCESS,
    GET_RECOMMENDATIONS
} from './movieType';

const initialState = {
    failedRequest : false,
    loading: false,
    moviesInfo : null,
    allTopMovies:null,
    loading_per_recommendations :false,
    per_recommendations:null,
    per_failure:false
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type){
        case GET_RECOMMENDATIONS:
            return{
                ...state,
                loading_per_recommendations:true
            }
        case GET_RECOMMENDATIONS_SUCCESS:
            return{
                ...state,
                per_recommendations:payload,
                loading_per_recommendations:false
            }
        case GET_RECOMMENDATIONS_FAILURE:
            return{
                ...state,
                per_failure:payload,
                loading_per_recommendations:false
            }
        case GET_ALL_TOP_MOVIES:
            return{
                ...state,
                allTopMovies:payload,
                loading:false,
            };
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