import React from "react"
import { CommunityRequest } from "../../../api/community/CommunityUtil"
import DesktopCommunityProfile from "./DesktopCommunityProfile"
import MobileCommunityProfile from "./MobileCommunityProfile"

type Props = {
    community: CommunityRequest
    mobile: boolean
}

/**
 * A community profile.
 */
const CommunityProfile: React.FC<Props> = ({ mobile, community }) => {
    return mobile ? (
        <MobileCommunityProfile community={community} />
    ) : (
        <DesktopCommunityProfile community={community} />
    )
}

export default CommunityProfile
