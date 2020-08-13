import { combineReducers } from "redux";
import auth from "./auth.reducer"
import theme from "./theme.reducer"
import community from "./community.reducer"
import emotes from "./emotes.reducer";
import post from "./post.reducer"
import editor from "./editor.reducer"

export default combineReducers({ auth, theme, community, emotes, post, editor });