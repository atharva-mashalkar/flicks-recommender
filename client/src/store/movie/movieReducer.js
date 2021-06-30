import {
    FAILED_REQUEST,
    FETCH_GENERAL_RECOMMENDATIONS_SUCCESS,
    FETCH_MOVIE_REQUEST,
    FETCH_OMDB_REQUEST,
    FETCH_OMDB_REQUEST_SUCCESS
} from './movieType';

const initialState = {
    failedRequest : false,
    genreBasedMovies : null,
    loading: false,
    genre : null,
    moviesInfo : null
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type){
        case FETCH_OMDB_REQUEST:
            return{
                ...state,
                genre:payload,
            }
        case FETCH_OMDB_REQUEST_SUCCESS:
            return{
                ...state,
                genre:null,
                movieInfo:[...moviesInfo, [genre, payload]]
            }
        case FETCH_GENERAL_RECOMMENDATIONS_SUCCESS:
            return{
                ...state,
                genreBasedMovies : payload,
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
        default:
            return state;
    }
}