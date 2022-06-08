import React from "react"
import { MdSettings } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useExistingCommunityId } from "../../../../api/community/CommunityUtil"
import { media } from "../../../../api/util/Media"

const ModerateCommunityButton = styled.button`
    background-color: #644d54;
    border: none;
    border-radius: 4px;

    ${media(`font-size: 12px;`, `font-size: 16px;`, `font-size: 16px;`)}
`

/**
 * The moderate community button found on communities pages.
 */
const ModerateCommunity: React.FC<{ community: number; mobile: boolean }> = ({
    community,
    mobile,
}) => {
    const communityObj = useExistingCommunityId(community)
    const nav = useNavigate()
    const canSee = communityObj.selfRole >= 3

    const onClick = async () => {
        nav(`/c/${communityObj.community.name}/moderate`)
    }

    if (canSee)
        return (
            <ModerateCommunityButton onClick={onClick}>
                <MdSettings /> Moderate {!mobile ? "Community" : ""}
            </ModerateCommunityButton>
        )

    return <></>
}

export default ModerateCommunity
