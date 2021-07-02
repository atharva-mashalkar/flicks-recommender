import { combineReducers } from "redux";
import movieReducer from "./movie/movieReducer";
import userReducer from "./user/userReducer";

export default combineReducers({
  movie: movieReducer,
  user: userReducer
});
