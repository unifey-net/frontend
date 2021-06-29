import React from "react"
import CommunityManage from "../../feed/CommunityManage"
import Text from "antd/lib/typography/Text"
import { Divider } from "antd"
import { CommunityRequest } from "../../../api/community/CommunityUtil"
import { Link } from "react-router-dom"
import styled from "styled-components"
import CommunityStaff from "../CommunityStaff"
import CommunityProfileRules from "../rules/CommunityProfileRules"

const DesktopProfileStyle = styled.div`
    background-color: ${({ theme }) => theme.primary};
    padding: 16px;
    border-radius: 32px;
    height: min-content;
    max-width: 200px;

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
            <div className="top">
                {community.selfRole === 4 && (
                    <Link to={`/c/${community.community.name}/moderate`}>
                        Moderate
                    </Link>
                )}

                <CommunityManage
                    community={community.community.id}
                    type="TEXT"
                />
            </div>

            <Divider />

            <div>
                <h3 className="text-lg">{community.community.name} </h3>
            </div>

            <Text>
                <p
                    dangerouslySetInnerHTML={{
                        __html: community.community.description,
                    }}
                />
            </Text>

            <Divider />

            <h3>Member Count</h3>
            <Text>{community.community.size} members.</Text>

            <Divider />

            <h3>Created On</h3>
            <Text>
                {new Date(community.community.createdAt).toLocaleString()}
            </Text>

            <Divider />

            <h3>Staff Members</h3>
            <CommunityStaff id={community.community.id} />

            <h3>Rules</h3>
            <CommunityProfileRules community={community} />
        </DesktopProfileStyle>
    )
}

export default DesktopCommunityProfile
