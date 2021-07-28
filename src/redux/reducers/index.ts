import { combineReducers } from "redux"
import auth from "./auth.reducer"
import community from "./community.reducer"
import emotes from "./emotes.reducer"
import post from "./post.reducer"
import editor from "./editor.reducer"
import feeds from "./feeds.reducer"
import notifications from "./notifications.reducer"

export default combineReducers({
    auth,
    community,
    emotes,
    post,
    editor,
    feeds,
    notifications,
})
