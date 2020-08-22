import { Emote } from "../Emotes"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { postEmotes } from "../../redux/actions/emotes.actions"
import { API } from "../ApiHandler"
import { message } from "antd"
import debug from "../Debug"

/**
 * Get emotes that can be used in a feed.
 */
export default (): Emote[] => {
    return useSelector((state: any) => state.emotes)
}

export const useCommunityEmotes = (emotes: Emote[]) => {
    const dispatch = useDispatch()

    debug("Loaded community emotes: %o", [emotes])

    useEffect(() => {
        dispatch(postEmotes(emotes))
    }, [])
}

export const useDefaultEmotes = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const loadEmotes = async () => {
            let request = await API.get("/emote")

            if (request.status !== 200) {
                message.error("There was an issue loading emotes.")
            } else {
                debug("%o", [request.data])
                dispatch(postEmotes(request.data))
            }
        }

        loadEmotes()
    }, [])
}