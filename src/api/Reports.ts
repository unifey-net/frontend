import { API } from "./ApiHandler"

/**
 * A report.
 */
export type Report = {
    id: number
    feed: string | null
    reportee: number
    target: ReportTarget
    reportType: "UNIFEY" | "COMMUNITY"
    reason: string
    date: number
}

export type ReportRequest = {
    report: Report
    data: ReportData
}

export type ReportData = {
    url: string // the URL of the reported target.
    reportee: string // the reportee's username
    target: string // the target's username (the author of the post)
}

export type ReportTarget = {
    id: number
    type: "POST" | "ACCOUNT" | "COMMENT"
}

/**
 * Change the report type to be more readable.
 * @param type The report type.
 */
export const fixReportType = (type: string): string => {
    const str = type.toLowerCase().replaceAll("_", " ")

    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const sendReport = async (
    target: ReportTarget,
    reason: "COMMUNITY" | "UNIFEY",
    reasonText: string
) => {
    const form = new FormData()

    form.append("targetType", target.type)
    form.append("targetId", `${target.id}`)
    form.append("reason", reason)
    form.append("reasonText", reasonText)

    return await API.put("/report", form)
}

export const getCommunityReports = async (id: number) => {
    return await API.get(`/report/cf_${id}`)
}
