import { CommunityRequest } from "../../api/community/CommunityUtil"

export const COMMUNITY__POST = "COMMUNITY__POST"
export const COMMUNITY__ADD_RULE = "COMMUNITY__ADD_RULE"
export const COMMUNITY__REMOVE_RULE = "COMMUNITY__REMOVE_RULE"

/**
 * Post a community to the cache,.
 * @param {*} community
 */
export const postCommunity = (community: CommunityRequest) => ({
    type: COMMUNITY__POST,
    payload: community,
})

export const addRule = (
    community: number,
    body: string,
    title: string,
    id: number
) => ({
    type: COMMUNITY__ADD_RULE,
    payload: { community, body, title, id },
})

export const removeRule = (community: number, id: number) => ({
    type: COMMUNITY__REMOVE_RULE,
    payload: { community, id },
})
