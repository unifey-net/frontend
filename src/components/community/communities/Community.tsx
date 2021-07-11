import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import notifications from "../../../redux/reducers/notifications.reducer"
import CommunityNotifications from "./CommunityNotifications"

const CommunityStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.primary};

    .member-count {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        border-radius: 2px;
        border-bottom: 2px solid ${({ theme }) => theme.background};
    }
`

/**
 * An individual community for the /communities page.
 */
const Community: React.FC<{
    community: any
    index?: number
    useNotifications: boolean
}> = ({ community, index, useNotifications }) => {
    return (
        <CommunityStyle>
            {index !== undefined && (
                <div className="member-count">
                    <span>
                        <b>#{index + 1}</b>
                    </span>
                    <span>{community.size} Members</span>
                </div>
            )}

            <h2>
                <Link to={`/c/${community.name}`}>{community.name}</Link>
            </h2>

            {useNotifications ? (
                <CommunityNotifications community={community.id as number} />
            ) : (
                <></>
            )}
        </CommunityStyle>
    )
}

export default Community
