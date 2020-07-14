import store from "../redux/store"
import { API } from "./ApiHandler";
import { postEmotes } from "../redux/actions/emotes.actions";

/**
 * Get global emotes
 */
export const getGlobalEmotes = async () => {
    let state = store.getState().emotes
 
    if (state.length === 0) {
        let request = await API.get(`/emote`);

        if (request.status !== 200)
            return request

        store.dispatch(postEmotes(request))
    }

    return state
};
