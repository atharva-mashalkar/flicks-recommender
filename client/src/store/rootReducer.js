import { combineReducers } from "redux";
import movieReducer from "./movie/movieReducer";

export default combineReducers({
  movie: movieReducer,
});
