import React from "react"
import PostJsx from "./post/Post"
import { Spin, Empty } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { PostResponse } from "../../api/Feeds"
import InfiniteScroll from "react-infinite-scroll-component"
import styled from "styled-components"
import { MdRefresh, MdArrowDropDown } from "react-icons/md"
import DefaultContainer from "../DefaultContainer"
import { media } from "../../api/util/Media"

const LinksStyle = styled.div`

    ${media("max-width: 500px;", "width: 500px;", "width: 500px;")}
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${props => props.theme.primary};
    border-radius: 32px;
    margin-bottom: 8px;
    padding: 8px;

    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    svg {
        height: 1rem;
        width: 1rem;
    }

    .create-post:disabled {
        cursor: not-allowed;
    }
`

/**
 * A skeleton of the links on the top of a feed. Create post etc.
 */
const LinksSkeleton: React.FC<{
    onReload: () => void
    createPost?: () => void | undefined
    changeSort: () => void 
    currentSort: string
}> = ({ onReload, createPost, changeSort, currentSort }) => {
    return (
        <LinksStyle>
            <button
                disabled={!createPost}
                onClick={createPost}
                className="create-post"
            >
                + Create Post
            </button>

            <div className="reload-change-sort">
                <button onClick={changeSort} className="change-sort">
                    Sort by{" "}
                    {currentSort[0] + currentSort.toLowerCase().substring(1)}{" "}
                    <MdArrowDropDown />
                </button>
                <button onClick={onReload} className="reload">
                    <MdRefresh />
                </button>
            </div>
        </LinksStyle>
    )
}

/**
 * Props for FeedSkeleton
 * 
 */
type Props = {
    posts: PostResponse[]

    isFeedEmpty?: boolean

    hasMore: () => boolean
    loadMore: () => void
    onReload: () => void

    createPost?: () => void | undefined

    changeSort: () => void
    currentSort: string
}

const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;
`

/**
 * A skeleton of the feed, with imported functionality.
 */
const FeedSkeleton: React.FC<Props> = ({
    createPost,
    loadMore,
    posts,
    hasMore,
    onReload,
    changeSort,
    currentSort,
    isFeedEmpty,
}) => {
    if (isFeedEmpty || posts.length === 0) {
        return (
            <div>
                <LinksSkeleton
                    onReload={onReload}
                    changeSort={changeSort}
                    createPost={createPost}
                    currentSort={currentSort}
                />

                <Empty
                    style={{ minWidth: "200px" }}
                    description={"There are no posts in this feed."}
                />
            </div>
        )
    }

    return (
        <div>
            <LinksSkeleton
                onReload={onReload}
                changeSort={changeSort}
                createPost={createPost}
                currentSort={currentSort}
            />

            <InfiniteScroll
                dataLength={posts.length}
                next={loadMore}
                hasMore={hasMore()}
                loader={
                    <DefaultContainer>
                        <Spin key={0} indicator={<LoadingOutlined />} />
                    </DefaultContainer>
                }
            >
                <FeedContainer>
                    {posts.map((post, index) => (
                        <PostJsx key={index} allowFocusChange={true} postResponse={post} />
                    ))}
                </FeedContainer>
            </InfiniteScroll>
        </div>
    )
}

export default FeedSkeleton
