import { useRouteMatch } from "react-router-dom"
import React from "react"
import Feed from "../../../components/feed/FeedSkeleton"
import { Empty, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import CommunityStaff from "../../../components/community/CommunityStaff"
import { useCommunity } from "../../../api/community/CommunityUtil"
import { useCommunityEmotes } from "../../../api/community/useEmotes"
import DesktopCommunityProfile from "../../../components/community/profile/DesktopCommunityProfile"
import MobileCommunityProfile from "../../../components/community/profile/MobileCommunityProfile"
import CommunityProfileRules from "../../../components/community/rules/CommunityProfileRules"
import { COMPLETE, LOADING, ERROR } from "../../../api/util/Status"
import FeedController from "../../../components/feed/controller/FeedController"
import FocusedPost from "../../../components/feed/post/FocusedPost"

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
                        {post && (
                            <FocusedPost postId={post} feed={community.feed.id} />
                        )}

                        {!post && (
                            <FeedController
                                id={`cf_${community.community.id}`}
                                usePostbox={
                                    community.selfRole >=
                                    community.community.postRole
                                }
                            />
                        )}

                        <div className="flex flex-col gap-8">
                            <DesktopCommunityProfile community={community} />

                            <CommunityStaff id={community.community.id} />

                            <CommunityProfileRules community={community} />
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
