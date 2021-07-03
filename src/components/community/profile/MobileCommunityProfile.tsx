import React from "react"
import { CommunityRequest } from "../../../api/community/CommunityUtil"
import styled from "styled-components"
import CommunityStaff from "../CommunityStaff"
import CommunityProfileRules from "../rules/CommunityProfileRules"

const MobileCommunityProfileStyle = styled.div`
    background-color: #191919;
    width: 100%;

    margin-left: 16px;
    margin-right: 16px;
    padding: 16px;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    h4 {
        font-size: 12px;
        font-weight: normal;
        color: #696761;
    }

    p {
        color: white;
    }
`

/**
 * A community profile for mobile.
 */
const MobileCommunityProfile: React.FC<{ community: CommunityRequest }> = ({ community }) => {
    return (
        <MobileCommunityProfileStyle>
            <div>
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
                        {new Date(
                            community.community.createdAt
                        ).toLocaleString()}
                    </p>
                </div>

                <h4>Staff Members</h4>
                <CommunityStaff id={community.community.id} />

                <h4>Rules</h4>
                <CommunityProfileRules community={community} />
            </div>
        </MobileCommunityProfileStyle>
    )
}

export default MobileCommunityProfile;