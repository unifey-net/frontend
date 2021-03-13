import React, { useState, useEffect } from "react"
import CommunityReport from "./CommunityReport"
import { ReportRequest } from "../../../../api/Reports"
import { CommunityRequest } from "../../../../api/community/CommunityUtil"
import { Alert, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import Status, { LOADING, COMPLETE, ERROR } from "../../../../api/util/Status"
import { getCommunityReports} from "../../../../api/Reports"

type Props = {
    community: CommunityRequest
}

/**
 * A communities reports.
 */
const CommunityReports: React.FC<Props> = ({ community }) => {
    const [reports, setReports] = useState([] as ReportRequest[])
    const [status, setStatus] = useState({
        message: "",
        status: LOADING,
    } as Status)

    useEffect(() => {
        const loadReports = async () => {
            let request = await getCommunityReports(community.community.id)

            if (request.status !== 200) {
                setStatus({ message: request.data.payload, status: ERROR })
            } else {
                setReports(request.data)
                setStatus({ message: "", status: COMPLETE })
            }
        }

        loadReports()
    }, [community.community.id])

    return (
        <>
            <h1 className="text-2xl">Reports</h1>

            {status.status === COMPLETE && (
                <ul>
                    {reports.length === 0 && (
                        <span>There are currently no reports.</span>
                    )}

                    {reports.length !== 0 && (
                        <>
                            <span>
                                There are currently {reports.length} report(s).
                            </span>

                            {reports.map((report, index) => (
                                <CommunityReport
                                    index={index + 1}
                                    reportRequest={report}
                                    community={community}
                                />
                            ))}
                        </>
                    )}
                </ul>
            )}

            {status.status === ERROR && (
                <Alert
                    type="error"
                    showIcon
                    description={status.message}
                    message="Uh oh."
                />
            )}

            {status.status === LOADING && (
                <Spin indicator={<LoadingOutlined />} />
            )}
        </>
    )
}

export default CommunityReports