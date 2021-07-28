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

/**
 * Add a rule to a community.
 * 
 * @param community The community's ID. 
 * @param body The body of the rule.
 * @param title The title of the rule.
 * @param id The ID of the rule.
 */
export const addRule = (
    community: number,
    body: string,
    title: string,
    id: number
) => ({
    type: COMMUNITY__ADD_RULE,
    payload: { community, body, title, id },
})

/** 
 * @param community The community where the rule resides.
 * @param id The ID of the rule
 */
export const removeRule = (community: number, id: number) => ({
    type: COMMUNITY__REMOVE_RULE,
    payload: { community, id },
})
