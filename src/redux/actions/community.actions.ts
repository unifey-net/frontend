import { CommunityRequest } from "../../api/community/CommunityUtil"
import { Report } from "../../api/Reports"

export const COMMUNITY__POST = "COMMUNITY__POST"

export const COMMUNITY__ADD_RULE = "COMMUNITY__ADD_RULE"
export const COMMUNITY__REMOVE_RULE = "COMMUNITY__REMOVE_RULE"

export const COMMUNITY__ADD_REPORTS = "COMMUNITY__ADD_REPORTS"
export const COMMUNITY__REMOVE_REPORT = "COMMUNITY__REMOVE_REPORT"
export const COMMUNITY__REMOVE_REPORTS = "COMMUNITY__REMOVE_REPORTS"

/**
 * Add reports to a community. (This is from the web request)
 * 
 * @param community The community.
 * @param reports The reports retrieved.
 */
export const addCommunityReports = (community: number, reports: Report[]) => ({
    type: COMMUNITY__ADD_REPORTS,
    payload: { community, reports }
})

/**
 * Remove all reports from a community.
 * @param community The community.
 */
export const removeCommunityReports = (community: number) => ({
    type: COMMUNITY__REMOVE_REPORTS,
    payload: { community }
})

/**
 * When a community report is deleted.
 * 
 * @param community The community. 
 * @param report The report to delete.
 */
export const removeCommunityReport = (community: number, report: number) => ({
    type: COMMUNITY__REMOVE_REPORT,
    payload: { community, report }
})

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
