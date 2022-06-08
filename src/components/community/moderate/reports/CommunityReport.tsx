import React, { useState } from "react"
import { ReportRequest } from "../../../../api/Reports"
import { CaretDownFilled, CaretRightFilled } from "@ant-design/icons"
import { Button, message } from "antd"
import { CommunityRequest } from "../../../../api/community/CommunityUtil"
import { Link } from "react-router-dom"
import { API } from "../../../../api/ApiHandler"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { useAppDispatch } from "../../../../util/Redux"
import { removeReport } from "../../../../api/community/redux/community.redux"

type Props = {
    index: number
    reportRequest: ReportRequest
    community: CommunityRequest
}

const Report = styled.div`
    background-color: ${({ theme }) => theme.primary};
    padding: 8px;
    border-radius: 4px;

    .report-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .extended {
        .buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            margin-top: 8px;
        }
    }
`

/**
 * A community report.
 */
const CommunityReport: React.FC<Props> = ({
    index,
    reportRequest,
    community,
}: Props) => {
    const { report, data } = reportRequest
    const dispatch = useAppDispatch()

    const [extended, setExtended] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    /**
     * Delete a report.
     */
    const deleteReport = async () => {
        setDeleteLoading(true)

        let request = await API.delete(
            `/report/${community.feed.id}/${reportRequest.report.id}`
        )

        if (request.status === 200) {
            dispatch(
                removeReport({
                    community: community.community.id,
                    report: report.id,
                })
            )
            message.success("Successfully deleted report.")
        } else {
            message.error(request.data.payload)
        }

        setDeleteLoading(false)
    }

    const caret = extended ? (
        <CaretRightFilled onClick={() => setExtended(prev => !prev)} />
    ) : (
        <CaretDownFilled onClick={() => setExtended(prev => !prev)} />
    )

    return (
        <Report>
            <div className="report-header">
                <strong>#{index}</strong>

                <span>
                    {new Date(report.date).toLocaleString()} — {report.reason}
                </span>

                <span>{caret}</span>
            </div>

            {extended && (
                <div className="extended">
                    <div className="buttons">
                        <Button type="primary">
                            <Link to={data.url} target="_blank">
                                View Post/Comment
                            </Link>
                        </Button>

                        <Button type="primary">
                            <Link to={`/u/${data.target}`} target="_blank">
                                Reporter
                            </Link>
                        </Button>

                        <Button
                            danger
                            onClick={deleteReport}
                            loading={deleteLoading}
                        >
                            Delete Report
                        </Button>
                    </div>
                </div>
            )}
        </Report>
    )
}

export default CommunityReport
