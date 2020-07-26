import store from "../redux/store"
import { API } from "./ApiHandler";
import { postEmotes } from "../redux/actions/emotes.actions";

export type Emote = {
    name: string,
    url: string
}

/**
 * Parse emotes into a body.
 * @param {*} body 
 * @param {*} emotes 
 */
export const parseBody = (body: string, emotes: Emote[]) => {
    let newBody = body
    let parsed = [...body.matchAll(/^:[A-Za-z0-9-_]+:$/g)];

    const getEmote = (emote: string) => {
        for (let i = 0; emotes.length > i; i++) {
            if (emotes[i].name === emote)
                return emotes[i]
        }

        return null
    }

    for (let i = 0; parsed.length > i; i++) {
        let emote = parsed[i][0]

        let emoteString = emote.substring(1);
        emoteString = emoteString.slice(0, -1);

        let parsedEmote = getEmote(emoteString);

        if (parsedEmote != null) {
            newBody = newBody.replace(emote, `<img src="${parsedEmote.url}" alt="${parsedEmote.name}" width=32 height=32/>`);
        }
    }

    return newBody
}


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
