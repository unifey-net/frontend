import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Emote = {
    name: string
    url: string
}

export const emoteSlice = createSlice({
    name: "emote",
    initialState: [] as Emote[],
    reducers: {
        postEmotes: (state, action: PayloadAction<{ emotes: Emote[] }>) =>
            [...state, ...action.payload.emotes]
    }
})

/**
 * Parse emotes into a body.
 * @param {*} body
 * @param {*} emotes
 */
export const parseBody = (body: string, emotes: Emote[]) => {
    let newBody = body
    let parsed = [...body.matchAll(/:[\w+]+:/g)]

    const getEmote = (emote: string) => {
        for (let i = 0; emotes.length > i; i++) {
            if (emotes[i].name === emote) return emotes[i]
        }

        return null
    }

    for (let i = 0; parsed.length > i; i++) {
        let emote = parsed[i][0]

        let emoteString = emote.substring(1)
        emoteString = emoteString.slice(0, -1)

        let parsedEmote = getEmote(emoteString)

        if (parsedEmote != null) {
            newBody = newBody.replace(
                emote,
                `<img src="${parsedEmote.url}" alt="${parsedEmote.name}" width=32 height=32/>`
            )
        }
    }

    return newBody
}
