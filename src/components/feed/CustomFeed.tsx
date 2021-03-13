import React, { useCallback, useEffect, useState } from "react"
import PostJsx from "./post/Post"
import { Spin, Alert, Empty } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { PostResponse } from "../../api/Feeds"
import LinkButton from "../LinkButton"
import useSortChanger from "./SortChanger"
import InfiniteScroll from "react-infinite-scroll-component"
import {
    CustomFeedResponse,
    getCustomFeed,
} from "../../api/community/CustomFeed"
import Status, { COMPLETE, ERROR, LOADING } from "../../api/util/Status"

type Props = {
    url: string
    focus?: number
}

const CustomFeed: React.FC<Props> = ({ focus, url }) => {
    const [status, setStatus] = useState({ status: LOADING } as Status)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(-1)
    const [posts, setPosts] = useState([] as PostResponse[])

    const [sort, button] = useSortChanger("NEW", sort => {
        setPosts([])
        setPage(0)
        loadMore()
    })

    /**
     * Load another post.
     */
    const loadMore = useCallback(async () => {
        if (maxPage === 0 || (maxPage !== -1 && page > maxPage)) return

        const feed = await getCustomFeed(url, sort, page)

        if (feed.status === 200) {
            setStatus({ status: COMPLETE })
            const feedObj = feed.data as CustomFeedResponse

            setMaxPage(feedObj.feed.pageCount)
            setPosts(posts => [...posts, ...feedObj.posts])
            setPage(page => page + 1)
        } else {
            setStatus({ status: ERROR, message: feed.data.payload })
        }
    }, [maxPage, page, sort, url])

    // init load
    useEffect(() => {
        loadMore()
    }, [loadMore])

    return (
        <div>
            {!focus && (
                <div className="flex flex-row justify-evenly accent mb-2 rounded p-2 gap-8">
                    {button}

                    <LinkButton
                        onClick={() => {
                            setPosts([])
                            setPage(0)
                            loadMore()
                        }}
                    >
                        Reload
                    </LinkButton>
                </div>
            )}

            {status.status === ERROR && (
                <Alert
                    message="There was an issue loading this feed."
                    description={status.message}
                    type="error"
                    showIcon
                />
            )}

            {status.status === LOADING && (
                <div className="flex flex-rows justify-center items-center">
                    <Spin indicator={<LoadingOutlined />} />
                </div>
            )}

            {status.status === COMPLETE && (
                <>
                    {maxPage <= 0 && (
                        <Empty
                            style={{ minWidth: "200px" }}
                            description={
                                <p>There are no posts in this feed.</p>
                            }
                        />
                    )}

                    {maxPage > 0 && (
                        <>
                            {!focus && (
                                <InfiniteScroll
                                    dataLength={posts.length}
                                    next={() => {}}
                                    hasMore={maxPage > page}
                                    loader={
                                        <div className="flex flex-row justify-center align-center">
                                            <Spin
                                                key={0}
                                                indicator={<LoadingOutlined />}
                                            />
                                        </div>
                                    }
                                >
                                    <ul className="feed-container">
                                        {posts.map((post, index) => (
                                            <li key={index}>
                                                <PostJsx
                                                    author={post.author}
                                                    post={post.post}
                                                    vote={post.vote}
                                                    feed={post.post.feed}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </InfiniteScroll>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default CustomFeed
