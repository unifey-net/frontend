import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../api/user/redux/auth.redux"
import { communitySlice } from "../api/community/redux/community.redux"
import { postSlice } from "../api/Feeds"
import { liveSlice } from "../api/live/live.redux"
import { editorSlice } from "./editor.redux"
import { emoteSlice } from "../api/Emotes"
import { notificationsSlice } from "../api/notification/Notifications"

const store = configureStore({
    reducer: {
        authSlice,
        communitySlice,
        postSlice,
        liveSlice,
        editorSlice,
        emoteSlice,
        notificationsSlice
    },
    devTools: true
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
