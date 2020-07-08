export const isAutoDark = () => {
    let time = new Date().getHours()

    return time >= 18 || 8 >= time
}

/**
 * Parse emotes into a body.
 * @param {*} body 
 * @param {*} emotes 
 */
export const parseBody = (body, emotes) => {
    let newBody = body
    let parsed = [...body.matchAll(/^:[A-Za-z0-9-_]+:$/g)];

    const getEmote = (emote) => {
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
