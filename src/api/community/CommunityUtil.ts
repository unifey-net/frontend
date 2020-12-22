import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { getCommunityByName } from "./Community"
import { postCommunity } from "../../redux/actions/community.actions"
import { RequestStatus } from "../ApiHandler"
import { Emote } from "../Emotes"
import { Feed } from "../Feeds"
import { getNameById } from "../../redux/reducers/community.reducer"

export type CommunityRule = {
    id: number
    title: string
    body: string
}

export type Community = {
    id: number
    size: number
    createdAt: number
    postRole: number
    viewRole: number
    commentRole: number
    name: string
    description: string
    rules: CommunityRule[]
}

export type CommunityRequest = {
    selfRole: number
    community: Community
    emotes: Emote[]
    feed: Feed
}

export const useCommunity = (
    name: string
): [CommunityRequest | null, RequestStatus] => {
    let dispatch = useDispatch()

    let [status, setStatus] = useState({
        status: 0,
        message: "This feed hasn't been loaded yet.",
    })

    let storedCommunity = useSelector((state: any) => state.community[name])

    useEffect(() => {
        const grabCommunity = async () => {
            let resp = await getCommunityByName(name)

            if (resp.status === 200) {
                dispatch(postCommunity(resp.data))

                setStatus(prev => ({
                    ...prev,
                    message: "This feed has been loaded.",
                    status: 1,
                }))
            } else {
                setStatus(prev => ({
                    ...prev,
                    status: -1,
                    message: resp.data.payload,
                }))
            }
        }

        if (storedCommunity === undefined) {
            grabCommunity()
        }
    }, [name, dispatch, storedCommunity])

    return [storedCommunity === undefined ? null : storedCommunity, status]
}

/**
 * Get an existing community (should already be in the community reducer) by an ID.
 *
 * @param id The ID of the community.
 */
export const useExistingCommunityId = (id: number): CommunityRequest => {
    let state = useSelector((state: any) => state)
    let key = getNameById(state, id)

    return state[key]
}
