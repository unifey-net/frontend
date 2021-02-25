import React, { useState } from "react"
import {
    fixReportType,
    ReportRequest,
} from "../../../../api/Reports"
import { CaretDownFilled, CaretRightFilled } from "@ant-design/icons"
import { Button, message } from "antd"
import { CommunityRequest } from "../../../../api/community/CommunityUtil"
import { Link } from "react-router-dom"
import { API } from "../../../../api/ApiHandler"

type Props = {
    index: number
    reportRequest: ReportRequest
    community: CommunityRequest
}

export default ({ index, reportRequest, community }: Props) => {
    const { report, data } = reportRequest

    const [extended, setExtended] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const [deleted, setDeleted] = useState(false)

    const extend = () => setExtended(prev => !prev)

    /**
     * Delete a report.
     */
    const deleteReport = async () => {
        setDeleteLoading(true)

        let request = await API.delete(
            `/report/${community.feed.id}/${reportRequest.report.id}`
        )

        if (request.status === 200) {
            setDeleted(true)

            message.success("Successfully deleted report.")
        } else {
            message.error(request.data.payload)
        }

        setDeleteLoading(false)
    }

    const caret = extended ? (
        <CaretRightFilled onClick={extend} />
    ) : (
        <CaretDownFilled onClick={extend} />
    )

    return (
        <div
            className={`p-4 border-black mb-2 rounded accent ${
                deleted ? "hidden" : ""
            }`}
        >
            <div className="flex flex-row justify-between">
                <span>
                    <strong>#{index}</strong> —{" "}
                    {fixReportType(report.reportType)}: {report.reason}
                </span>

                <span>{caret}</span>
            </div>

            {extended && (
                <div className="flex flex-row justify-between mt-4">
                    <span className="mt-1">
                        {new Date(report.date).toLocaleString()} | Reported by{" "}
                        {data.target}
                    </span>

                    <div className="flex flex-row justify-evenly gap-2">
                        <Button type="primary">
                            <Link to={data.url} target="_blank">
                                View Post/Comment
                            </Link>
                        </Button>

                        <Button danger onClick={deleteReport} loading={deleteLoading}>
                            Delete Report
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
