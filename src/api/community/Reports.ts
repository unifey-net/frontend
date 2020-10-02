export type Report = {
    id: number
    feed: string | null
    reportee: number
    target: ReportTarget
    reportType: "HACKED" | "DOES_NOT_FIT_TOPIC" | "SPAM"
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
    id: number,
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