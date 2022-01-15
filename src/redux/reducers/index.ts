import { combineReducers } from "redux"
import auth from "./auth.reducer"
import community from "./community.reducer"
import emotes from "./emotes.reducer"
import post from "./post.reducer"
import editor from "./editor.reducer"
import feeds from "./feeds.reducer"
import notifications from "./notifications.reducer"
import live from "./live.reducer"
import friends from "../../api/friends/redux/friends.reducer"
import messages from "../../components/messaging/redux/messages.reducer"

export default combineReducers({
    auth,
    community,
    emotes,
    post,
    editor,
    feeds,
    live,
    friends,
    notifications,
    messages
})
