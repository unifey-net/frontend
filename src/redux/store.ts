import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../api/user/redux/auth.redux"
import { communitySlice } from "../api/community/redux/community.redux"
import { feedSlice, postSlice } from "../api/Feeds"
import { liveSlice } from "../api/live/live.redux"
import { editorSlice } from "./editor.redux"
import { emoteSlice } from "../api/Emotes"
import { notificationsSlice } from "../api/notification/Notifications"
import { friendsSlice } from "../api/friends/redux/friends.redux"
import { messageSlices } from "../components/messaging/redux/messages"

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        community: communitySlice.reducer,
        post: postSlice.reducer,
        live: liveSlice.reducer,
        editor: editorSlice.reducer,
        emote: emoteSlice.reducer,
        notifications: notificationsSlice.reducer,
        friends: friendsSlice.reducer,
        feeds: feedSlice.reducer,
        messages: messageSlices.reducer
    },
    devTools: true
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
