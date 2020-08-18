import { CommunityRequest } from "../../api/community/CommunityUtil"

export const COMMUNITY__POST = "COMMUNITY__POST"

/**
 * Post a community to the cache,.
 * @param {*} community 
 */
export const postCommunity = (community: CommunityRequest) => ({
    type: COMMUNITY__POST,
    payload: community
})