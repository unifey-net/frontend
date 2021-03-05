import React from "react"
import CommunityManage from "../../feed/CommunityManage"
import { Link } from "react-router-dom"

type Props = {
    community: any
    index?: number
}

/**
 * An individual community for the /communities page.
 */
const Community = ({ community, index }: Props) => {
    return (
        <div className="rounded flex flex-row justify-between gap-8 p-4">
            {index !== undefined && (
                <div className="flex flex-col gap-2 min-w-lg">
                    <span className="text-gray-600 text-sm">
                        #{index + 1}
                        <br />
                        <span className="text-xs">{community.size} Members</span>
                    </span>
                </div>
            )}

            <h1 className="text-xl mr-4">
                <Link to={`/c/${community.name}`}>{community.name}</Link>
            </h1>

            <CommunityManage community={community.id} type="BUTTON" />
        </div>
    )
}

export default Community
