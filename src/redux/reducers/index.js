import { combineReducers } from "redux";
import auth from "./auth.reducer"
import alert from "./alert.reducer";
import theme from "./theme.reducer"
import community from "./community.reducer"
import emotes from "./emotes.reducer";

export default combineReducers({ auth, alert, theme, community, emotes });