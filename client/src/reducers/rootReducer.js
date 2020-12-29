import { combineReducers } from "redux";
import postReducer from "./post";

const rootReducer = combineReducers({ posts: postReducer });

export default rootReducer;
