import {
    COMMUNITY__POST,
    COMMUNITY__ADD_RULE,
    COMMUNITY__REMOVE_RULE,
    COMMUNITY__REMOVE_REPORT,
    COMMUNITY__ADD_REPORTS,
    COMMUNITY__REMOVE_REPORTS,
} from "../actions/community.actions"
import { CommunityRule } from "../../api/community/CommunityUtil"
import { ReportRequest } from "../../api/Reports"

/**
 * Manages communities.
 * @param {*} state
 * @param {*} action
 */
const community = (state = {} as any, action: any) => {
    switch (action.type) {
        case COMMUNITY__POST: {
            const community = action.payload

            state[community.community.name] = community

            return state
        }

        case COMMUNITY__ADD_REPORTS: {
            const { community, reports } = action.payload

            let key = getNameById(state, community)

            let obj = state[key]

            obj.reports = {
                reports: [],
                reportCount: 0
            }

            obj.reports.reports = reports
            obj.reports.reportCount = reports.length

            state[key] = obj

            return state
        }

        case COMMUNITY__REMOVE_REPORTS: {
            const { community } = action.payload

            let key = getNameById(state, community)

            state[key].reports = {
                reports: [],
                reportCount: 0
            }

            return state
        }

        case COMMUNITY__REMOVE_REPORT: {
            const { community, report } = action.payload

            let key = getNameById(state, community)

            let obj = state[key]
            let removeIndex: number = -1

            obj.reports.reports.forEach(
                (object: ReportRequest, index: number) => {
                    if (object.report.id === report)
                        removeIndex = index
                }
            )

            if (removeIndex !== -1) {
                obj.reports.reports.splice(removeIndex, 1)
                obj.reports.reportCount -= 1    
            }

            state[key] = obj

            return state
        }

        case COMMUNITY__ADD_RULE: {
            const { community, body, title, id } = action.payload
            let key = getNameById(state, community)

            let obj = state[key]

            obj.community.rules.push({
                title,
                body,
                id,
            })

            state[key] = obj

            return state
        }

        case COMMUNITY__REMOVE_RULE: {
            const { community, id } = action.payload
            let key = getNameById(state, community)

            let obj = state[key]
            let removeIndex: number = -1

            obj.community.rules.forEach(
                (object: CommunityRule, index: number) => {
                    if (object.id === id) removeIndex = index
                }
            )

            if (removeIndex !== -1) {
                obj.community.rules.splice(removeIndex, 1)
            }

            state[key] = obj

            return state
        }

        default: {
            return state
        }
    }
}

export const getNameById = (state: any, id: number): string => {
    let keys = Object.keys(state)

    for (let i = 0; keys.length > i; i++) {
        let key = keys[i]
        let obj = state[key]

        if (obj.community.id === id) return key
    }

    return ""
}

export default community
