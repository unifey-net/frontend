import React from "react"
import PostJsx from "./post/Post"
import { Spin, Empty } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { PostResponse } from "../../api/Feeds"
import LinkButton from "../LinkButton"
import InfiniteScroll from "react-infinite-scroll-component"

/**
 * Props for FeedSkeleton
 * 
 */
type Props = {
    postBox: JSX.Element

    posts: PostResponse[]

    isFeedEmpty?: boolean

    hasMore: () => boolean
    loadMore: () => void
    onReload: () => void
    changeSort: JSX.Element
}

/**
 * A skeleton of the links on the top of a feed. Create post etc.
 */
const LinksSkeleton: React.FC<{
    onReload: () => void
    postBox: JSX.Element
    changeSort: JSX.Element
}> = ({ onReload, postBox, changeSort }) => {
    return (
        <div className="flex flex-row justify-evenly accent mb-2 rounded p-2 gap-8">
            {postBox}

            {changeSort}

            <LinkButton onClick={onReload}>Reload</LinkButton>
        </div>
    )
}

/**
 * A skeleton of the feed, with imported functionality.
 */
const FeedSkeleton: React.FC<Props> = ({
    postBox,
    loadMore,
    posts,
    hasMore,
    onReload,
    changeSort,
    isFeedEmpty,
}) => {
    if (isFeedEmpty || posts.length === 0) {
        return (
            <div>
                <LinksSkeleton
                    onReload={onReload}
                    changeSort={changeSort}
                    postBox={postBox}
                />

                <Empty
                    style={{ minWidth: "200px" }}
                    description={<p>There are no posts in this feed.</p>}
                />
            </div>
        )
    }

    return (
        <div>
            <LinksSkeleton
                onReload={onReload}
                changeSort={changeSort}
                postBox={postBox}
            />

            <InfiniteScroll
                dataLength={posts.length}
                next={loadMore}
                hasMore={hasMore()}
                loader={
                    <div className="flex flex-row justify-center align-center">
                        <Spin key={0} indicator={<LoadingOutlined />} />
                    </div>
                }
            >
                <ul className="feed-container">
                    {posts.map((post, index) => (
                        <li key={index}>
                            <PostJsx postResponse={post} />
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
        </div>
    )
}

export default FeedSkeleton
