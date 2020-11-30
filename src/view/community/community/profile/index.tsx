import React from "react"
import { CommunityRequest } from "../../../../api/community/CommunityUtil"
import DesktopCommunityProfile from "./DesktopCommunityProfile"
import MobileCommunityProfile from "./MobileCommunityProfile"

type Props = {
    community: CommunityRequest
    mobile: boolean
}

export default ({ mobile, community }: Props) => {
    if (mobile) return <MobileCommunityProfile community={community} />
    else return <DesktopCommunityProfile community={community} />
}
