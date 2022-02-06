import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { media } from "../../../api/util/Media"
import CommunityNotifications from "./CommunityNotifications"

const CommunityStyle = styled.div<{ useCommunitiesPage: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 16px;

    ${({ useCommunitiesPage }) =>
        useCommunitiesPage
            ? `
        ${media(
            "min-width: calc(100vw - 32px);",
            "min-width: 600px;",
            "min-width: 600px;"
        )}
        margin-right: 16px; 
        margin-left: 16px;
    `
            : ""}
    background-color: ${({ theme }) => theme.primary};

    .community-name-notif {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
    }

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
        <CommunityStyle useCommunitiesPage={index !== undefined}>
            {index !== undefined && (
                <div className="member-count">
                    <span>
                        <b>#{index + 1}</b>
                    </span>
                    <span>{community.size} Members</span>
                </div>
            )}

            <div className="community-name-notif">
                <h2>
                    <Link to={`/c/${community.name}`}>{community.name}</Link>
                </h2>

                {useNotifications ? (
                    <CommunityNotifications
                        community={community.id as number}
                    />
                ) : (
                    <></>
                )}
            </div>
        </CommunityStyle>
    )
}

export default Community
