import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { API } from "../../api/ApiHandler"
import { Spin, Alert } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import styled from "styled-components"

const CommunityStaffStyle = styled.div`
    ul {
        display: flex;
        flex-direction: column;
    }

    .green {
        color: #58de33;
    }

    .red {
        color: #de3350;
    }
`

/**
 * A communities staff members. This appears as a section of the far right sidebar.
 */
const CommunityStaff: React.FC<{ id: number }> = ({ id }) => {
    let [staff, setStaff] = useState([] as any[])
    let [status, setStatus] = useState({
        status: 0,
        message: "",
    })

    useEffect(() => {
        const loadStaff = async () => {
            let request = await API.get(`/community/${id}/staff`)

            switch (request.status) {
                case 200: {
                    setStatus(prev => ({
                        ...prev,
                        status: 1,
                    }))

                    setStaff(request.data)

                    break
                }

                case 401: {
                    setStatus(prev => ({
                        ...prev,
                        status: -2,
                    }))

                    break
                }

                default: {
                    setStatus(prev => ({
                        ...prev,
                        status: -1,
                    }))

                    break
                }
            }
        }

        loadStaff()
    }, [id])

    return (
        <CommunityStaffStyle>
            {status.status === 0 && <Spin indicator={<LoadingOutlined />} />}

            {status.status === 1 && (
                <ul className="flex flex-col">
                    {staff.length > 0 &&
                        staff.map(({ role, user }, index) => {
                            let color =
                                role === 2 ? "green" : "red"

                            return (
                                <li key={index}>
                                    <Link
                                        to={`/u/${user.username}`}
                                        className={color}
                                    >
                                        {user.username}
                                    </Link>
                                </li>
                            )
                        })}

                    {staff.length === 0 && (
                        <p>There are no staff in this community.</p>
                    )}
                </ul>
            )}

            {status.status === -1 && (
                <Alert
                    message={"There was an issue getting the staff members."}
                    description={status.message}
                    type="warning"
                    showIcon
                />
            )}

            {status.status === -2 && (
                <Alert
                    message={
                        "You don't have permission to view this community!"
                    }
                    description={status.message}
                    type="error"
                    showIcon
                />
            )}
        </CommunityStaffStyle>
    )
}

export default CommunityStaff
