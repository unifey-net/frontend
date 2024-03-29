import React, { useState, useEffect } from "react"
import CommunityReport from "./CommunityReport"
import { ReportRequest } from "../../../../api/Reports"
import { CommunityRequest } from "../../../../api/community/CommunityUtil"
import { Alert, Button, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { LOADING, COMPLETE, ERROR, DEFAULT_STATUS } from "../../../../api/util/Status"
import { getCommunityReports } from "../../../../api/Reports"
import ModeratePage from "../ModeratePage"
import styled from "styled-components"
import { MdRefresh } from "react-icons/md"
import { addReports, removeReports } from "../../../../api/community/redux/community.redux"
import { useAppDispatch, useAppSelector } from "../../../../util/Redux"

type Props = {
    community: CommunityRequest
}

const ReportControls = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`

const Reports = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

/**
 * A communities reports.
 */
const CommunityReports: React.FC<Props> = ({ community }) => {
    const dispatch = useAppDispatch()
    const reports = useAppSelector((state) => state.community[community.community.name].community.reports)
    const [{ status, message }, setStatus] = useState(DEFAULT_STATUS)

    const loadReports = async () => {
        if (reports && reports.length > 0)
            dispatch(removeReports({ community: community.community.id }))

        setStatus({ message, status: LOADING })

        let request = await getCommunityReports(community.community.id)

        if (request.status !== 200) {
            setStatus({ message: request.data.payload, status: ERROR })
        } else {
            dispatch(addReports({ community: community.community.id, reports: request.data }))

            setStatus({ message: "", status: COMPLETE })
        }
    }

    useEffect(() => {
        loadReports()
        // eslint-disable-next-line
    }, [dispatch])

    if (status === LOADING) {
        return (
            <ModeratePage>
                <Spin indicator={<LoadingOutlined />} />
            </ModeratePage>
        )
    }

    if (status === ERROR) {
        return (
            <ModeratePage>
                <Alert
                    type="error"
                    showIcon
                    description={message}
                    message="There was an issue loading community reports."
                />
            </ModeratePage>
        )
    }

    return reports ? (
        <ModeratePage>
            <ReportControls>
                <p>There are currently {reports.reportCount} report(s).</p>

                <Button onClick={loadReports}>
                    <MdRefresh />
                </Button>
            </ReportControls>

            {reports.reportCount !== 0 && (
                <Reports>
                    {reports.reports.map(
                        (report: ReportRequest, index: number) => (
                            <CommunityReport
                                key={index}
                                index={index + 1}
                                reportRequest={report}
                                community={community}
                            />
                        )
                    )}
                </Reports>
            )}
        </ModeratePage>
    ) : (
        <Spin indicator={<LoadingOutlined/>} />
    )
}

export default CommunityReports
