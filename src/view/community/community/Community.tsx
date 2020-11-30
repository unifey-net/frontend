import { useRouteMatch } from "react-router-dom"
import React from "react"
import Feed from "../../../components/feed/Feed"
import { Empty, Spin, Typography } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import CommunityManage from "../../../components/feed/CommunityManage"
import CommunityStaff from "./CommunityStaff"
import CommunityRules from "./rules/CommunityRules"
import CommunityProfile from "./profile/DesktopCommunityProfile"
import { useCommunity } from "../../../api/community/CommunityUtil"
import { COMPLETE, LOADING, ERROR } from "../../../api/ApiHandler"
import { useCommunityEmotes } from "../../../api/community/useEmotes"
import DesktopCommunityProfile from "./profile/DesktopCommunityProfile"
import MobileCommunityProfile from "./profile/MobileCommunityProfile"

const { Text } = Typography

/**
 * A community viewer.
 * @param {*} props
 */
export default function Community() {
    const {
        params: { name, post },
    } = useRouteMatch()

    let [community, status] = useCommunity(name)

    useCommunityEmotes(
        community?.emotes === undefined ? [] : community?.emotes!!
    )

    if (community && community.community.viewRole > community.selfRole)
        return (
            <Empty description="You don't have permission to view this community." />
        )

    return (
        <div className="flex flex-col items-center justify-center">
            {status.status === COMPLETE && community !== null && (
                <>
                    <div className="flex flex-col lg:block">
                        <h1 className="text-3xl lg:text-4xl">
                            {community.community.name}
                        </h1>
                        <div className="block mb-6 lg:hidden">
                            <MobileCommunityProfile community={community} />
                        </div>
                    </div>

                    <br />

                    <div className="block lg:flex lg:flex-row lg:justify-between lg:gap-16">
                        <Feed
                            id={`cf_${community.community.id}`}
                            postBox={
                                community.selfRole >=
                                community.community.postRole
                            }
                            focus={post}
                        />

                        <div className="flex flex-col gap-8">
                            <DesktopCommunityProfile community={community} />

                            <CommunityStaff id={community.community.id} />

                            <CommunityRules community={community} />
                        </div>
                    </div>
                </>
            )}

            {status.status === LOADING && (
                <div className="flex align-center justify-center">
                    <Spin indicator={<LoadingOutlined />}></Spin>
                </div>
            )}

            {status.status === ERROR && (
                <div className="flex align-center justify-center">
                    <Empty description="That community could not be found." />
                </div>
            )}
        </div>
    )
}
