import { Emote } from "../Emotes"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { postEmotes } from "../../redux/actions/emotes.actions"
import { API } from "../ApiHandler"
import { message } from "antd"

/**
 * Get emotes that can be used in a feed.
 */
export default (): Emote[] => {
    return useSelector((state: any) => state.emotes)
}

export const useCommunityEmotes = (emotes: Emote[]) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(postEmotes(emotes))
    }, [dispatch, emotes])
}

export const useDefaultEmotes = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const loadEmotes = async () => {
            let request = await API.get("/emote")

            if (request.status !== 200) {
                message.error("There was an issue loading emotes.")
            } else {
                dispatch(postEmotes(request.data))
            }
        }

        loadEmotes()
    }, [dispatch])
}
