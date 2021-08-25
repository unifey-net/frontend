export const EMOTES__POST = "EMOTES__POST"

/**
 * Post global emotes to the cache,.
 * @param {*} emotes
 */
export const postEmotes = (emotes: any[]) => ({
    type: EMOTES__POST,
    payload: { emotes },
})
