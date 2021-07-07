import React from "react"
import { CommunityRequest } from "../../../api/community/CommunityUtil"
import styled from "styled-components"
import CommunityStaff from "../CommunityStaff"
import CommunityProfileRules from "../rules/CommunityProfileRules"

const DesktopProfileStyle = styled.div`
    background-color: ${({ theme }) => theme.primary};
    padding: 16px;
    border-radius: 32px;
    height: min-content;
    max-width: 200px;

    h4 {
        font-size: 12px;
        font-weight: normal;
        color: #696761;
    }

    p {
        color: #cccccc;
    }

    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`

/**
 * A communities profile for Desktop.
 */
const DesktopCommunityProfile: React.FC<{ community: CommunityRequest }> = ({
    community,
}) => {
    return (
        <DesktopProfileStyle>
            <div>
                <h4>Description</h4>
                <p
                    dangerouslySetInnerHTML={{
                        __html: community.community.description,
                    }}
                />
            </div>

            <div>
                <h4>Member Count</h4>
                <p>{community.community.size} members.</p>
            </div>

            <div>
                <h4>Created On</h4>
                <p>
                    {new Date(community.community.createdAt).toLocaleString()}
                </p>
            </div>

            <h4>Staff Members</h4>
            <CommunityStaff id={community.community.id} />

            <h4>Rules</h4>
            <CommunityProfileRules community={community} />
        </DesktopProfileStyle>
    )
}

export default DesktopCommunityProfile
