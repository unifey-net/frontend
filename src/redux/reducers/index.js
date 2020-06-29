import { combineReducers } from "redux";
import auth from "./auth.reducer"
import alert from "./alert.reducer";

export default combineReducers({ auth, alert });