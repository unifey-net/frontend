import React from "react"
import CommunityManage from "../../feed/CommunityManage"
import Text from "antd/lib/typography/Text"
import { Divider } from "antd"
import { CommunityRequest } from "../../../api/community/CommunityUtil"
import { Link } from "react-router-dom"

type Props = {
    community: CommunityRequest
}

export default ({ community }: Props) => {
    return (
        <div
            className="accent p-4 rounded invisible lg:visible"
            style={{
                maxWidth: "200px",
                height: "min-content",
            }}
        >
            <div className="flex flex-row justify-between items-center -mb-3">
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

            <div className="flex flex-row justify-between">
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

            <h3 className="text-lg">Member Count</h3>
            <Text>{community.community.size} members.</Text>

            <Divider />

            <h3 className="text-lg">Created On</h3>
            <Text>
                {new Date(community.community.createdAt).toLocaleString()}
            </Text>
        </div>
    )
}
