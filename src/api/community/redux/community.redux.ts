import { CommunityRule } from "../../community/CommunityUtil"
import { ReportRequest } from "../../Reports"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CommunityRequest } from "../CommunityUtil"
import { Report } from "../../Reports"

export const communitySlice = createSlice({
    name: "community",
    initialState: {} as any,
    reducers: {
        /**
         * When a community is fetched through any method.
         */
        postCommunity: (
            state,
            action: PayloadAction<{ community: CommunityRequest }>
        ) => {
            const community = action.payload.community

            state[community.community.name] = community
        },
        addReports: (
            state,
            action: PayloadAction<{ community: number; reports: Report[] }>
        ) => {
            const key = getNameById(state, action.payload.community)

            state[key].community.reports = {
                reports: action.payload.reports,
                reportCount: action.payload.reports.length,
            }
        },
        removeReports: (
            state,
            action: PayloadAction<{ community: number }>
        ) => {
            const key = getNameById(state, action.payload.community)

            state[key].community.reports = {
                reports: [],
                reportCount: 0,
            }
        },
        removeReport: (
            state,
            action: PayloadAction<{ community: number; report: number }>
        ) => {
            const key = getNameById(state, action.payload.community)
            let removeIndex = -1

            state[key].community.report.reports.forEach(
                (object: ReportRequest, index: number) => {
                    if (object.report.id === action.payload.report)
                        removeIndex = index
                }
            )

            if (removeIndex !== -1) {
                state[key].community.reports.reports = state[
                    key
                ].reports.reports.splice(removeIndex, 1)
                state[key].community.reports.reportCount -= 1
            }
        },
        addRule: (
            state,
            action: PayloadAction<{
                community: number
                body: string
                title: string
                id: number
            }>
        ) => {
            const { body, title, id } = action.payload

            const key = getNameById(state, action.payload.community)

            state[key].community.rules.push({
                title,
                body,
                id,
            })
        },
        removeRule: (
            state,
            action: PayloadAction<{ community: number; id: number }>
        ) => {
            const key = getNameById(state, action.payload.community)
            let removeIndex = -1

            state[key].community.rules.forEach(
                (object: CommunityRule, index: number) => {
                    if (object.id === action.payload.id) removeIndex = index
                }
            )

            if (removeIndex === -1) {
                state[key].community.rules = state[key].community.rules.splice(
                    removeIndex,
                    1
                )
            }
        },
    },
})

export const getNameById = (state: any, id: number): string => {
    let keys = Object.keys(state)

    for (let i = 0; keys.length > i; i++) {
        let key = keys[i]
        let obj = state[key]

        if (obj.community.id === id) return key
    }

    return ""
}

export const {
    removeRule,
    addRule,
    removeReport,
    removeReports,
    addReports,
    postCommunity,
} = communitySlice.actions
