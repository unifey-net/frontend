import React, { useCallback, useEffect } from "react"
import PostJsx from "./post/Post"
import { Spin, Alert, Empty } from "antd"
import { LoadingOutlined, } from "@ant-design/icons"
import PostBox from "./PostBox"
import { getFeedPosts, useFeed } from "../../api/Feeds"
import FocusedPost from "./post/FocusedPost"
import { useDispatch } from "react-redux"
import {
    feedClear,
    loadPost,
    bumpPage,
    changeSort,
} from "../../redux/actions/feeds.actions"
import LinkButton from "../LinkButton"
import useSortChanger from "./SortChanger"
import InfiniteScroll from "react-infinite-scroll-component"

type Props = {
    id: string
    postBox?: any
    focus?: number
}

export default ({ id, focus, postBox }: Props) => {
    let dispatch = useDispatch()

    let [feed, status] = useFeed(id)

    const [sort, button] = useSortChanger("NEW", sort => {
        dispatch(changeSort({ sort, id }))
        dispatch(feedClear(id))
    })

    /**
    //  * Handle sorting.
    //  */
    useEffect(() => {
        let querySort = new URL(window.location.toString()).searchParams.get(
            "sort"
        )

        if ((querySort === "NEW" || querySort === "OLD" || querySort === "TOP") && querySort !== sort) {
            dispatch(
                changeSort({
                    sort: querySort.toLowerCase(),
                    id,
                })
            )
        }
    }, [dispatch, id, sort])

    /**
     * Load another post.
     */
    const loadMore = useCallback(async () => {
        let pageCount = feed?.feed.pageCount !== undefined ? feed?.feed.pageCount : 0;
        let currentPage = feed?.page !== undefined ? feed?.page : 0;

        if (pageCount === 0 || currentPage === 0 || currentPage > pageCount)
            return

        let resp = await getFeedPosts(id, sort, feed!!.page)
        dispatch(bumpPage(id))

        switch (resp.status) {
            case 200: {
                let posts = resp.data.posts

                dispatch(
                    loadPost({
                        posts,
                        sort,
                        id,
                    })
                )

                break
            }

            case 401: {
                // TODO

                break
            }

            default: {
                break
            }
        }
    }, [dispatch, feed, id, sort])

    useEffect(() => {
        // if feed grab is successful, start init load
        if (status.status === 1) {
            loadMore()
        }
    }, [status, loadMore])

    return (
        <div>
            {status.status === -1 && (
                <Alert
                    message="There was an issue with this feed."
                    description={status.message}
                    type="error"
                    showIcon
                />
            )}

            {status.status === 0 && <Spin indicator={<LoadingOutlined />} />}

            {feed !== null && feed.feed !== undefined && (
                <>
                    {!focus && (
                        <div className="flex flex-row justify-evenly accent mb-2 rounded p-2 gap-8">
                            {postBox && (
                                <PostBox
                                    feed={id}
                                    action={() => {
                                        dispatch(feedClear(id))
                                        loadMore()
                                    }}
                                />
                            )}

                            {button}

                            <LinkButton onClick={() => dispatch(feedClear(id))}>
                                Reload
                            </LinkButton>
                        </div>
                    )}

                    {feed.feed.postCount === 0 && (
                        <Empty
                            style={{ minWidth: "200px" }}
                            description={
                                <p>There are no posts in this feed.</p>
                            }
                        />
                    )}

                    {status.status === 1 && feed.feed.postCount !== 0 && (
                        <>
                            {focus && <FocusedPost feed={id} id={focus} />}

                            {!focus && (
                                <InfiniteScroll
                                    dataLength={feed.posts.length}
                                    next={() => loadMore()}
                                    hasMore={feed.feed.pageCount >= feed.page}
                                    loader={
                                        <Spin
                                            key={0}
                                            indicator={<LoadingOutlined />}
                                        />
                                    }
                                >
                                    <ul className="feed-container">
                                        {feed.posts.map((post, index) => (
                                            <li key={index}>
                                                <PostJsx
                                                    author={post.author}
                                                    post={post.post}
                                                    vote={post.vote}
                                                    feed={id}
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
