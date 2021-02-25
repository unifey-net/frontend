import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { getCommunityByName } from "./Community"
import { postCommunity } from "../../redux/actions/community.actions"
import Status, { COMPLETE, ERROR, LOADING } from "../util/Status"
import { Emote } from "../Emotes"
import { Feed } from "../Feeds"
import { getNameById } from "../../redux/reducers/community.reducer"

/**
 * Rules in a community.
 */
export type CommunityRule = {
    id: number
    title: string
    body: string
}

/**
 * A community.
 */
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

/**
 * The data for a community returned by the API.
 */
export type CommunityRequest = {
    selfRole: number
    community: Community
    emotes: Emote[]
    feed: Feed
}

/**
 * Grab a community and store it in Redux.
 *
 * @param name The name of the community.
 * @returns The community request and status.
 */
export const useCommunity = (
    name: string
): [CommunityRequest | null, Status] => {
    let dispatch = useDispatch()

    let [status, setStatus] = useState({ status: LOADING } as Status)

    let storedCommunity = useSelector((state: any) => state.community[name])

    useEffect(() => {
        const grabCommunity = async () => {
            let resp = await getCommunityByName(name)

            if (resp.status === 200) {
                dispatch(postCommunity(resp.data))

                setStatus({ status: COMPLETE })
            } else {
                setStatus({
                    status: ERROR,
                    message: resp.data.payload,
                })
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
