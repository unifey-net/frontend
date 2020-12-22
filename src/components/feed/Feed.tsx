import React, { useEffect } from "react"
import PostJsx from "./post/Post"
import { Spin, Dropdown, Menu, Alert, Empty } from "antd"
import {
    LoadingOutlined,
    DoubleRightOutlined,
} from "@ant-design/icons"
import InfiniteScroll from "react-infinite-scroller"
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
import debug from "../../api/Debug"
import ButtonText from "../ButtonText"

type Props = {
    id: string
    postBox?: any
    focus?: number
}

export default ({ id, focus, postBox }: Props) => {
    let dispatch = useDispatch()

    let [feed, status] = useFeed(id)

    const sort = feed?.sort === undefined || feed?.sort === null ? "new" : feed?.sort!!    

    const updateSort = (sort: string) => {
        debug("Sort has changed to %s", [sort])

        dispatch(
            changeSort({ sort, id })
        )

        dispatch(feedClear(id))
    }

    /**
     * Handle sorting.
     */
    useEffect(() => {
        let querySort = new URL(window.location.toString()).searchParams.get(
            "sort"
        )

        if (querySort === "new" || querySort === "old" || querySort === "top") {
            debug("Found sort in query %s", [querySort])

            dispatch(
                changeSort({
                    sort: querySort.toLowerCase(),
                    id,
                })
            )
        }
    }, [dispatch, id])

    /**
     * Load another post.
     */
    const loadMore = async () => {
        debug(`Loading more posts from ${id} (page: ${feed!!.page}, sort: ${sort})`)

        let resp = await getFeedPosts(id, sort, feed!!.page)

        switch (resp.status) {
            case 200: {
                dispatch(bumpPage(id))

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
    }

    /**
     * The sort menu management.
     */
    const menu = (
        <Menu>
            <Menu.Item onClick={() => updateSort("old")}>
                <span>{sort === "new" && <DoubleRightOutlined />} New</span>
            </Menu.Item>
            <Menu.Item onClick={() => updateSort("old")}>
                <span>{sort === "old" && <DoubleRightOutlined />} Old</span>
            </Menu.Item>
            <Menu.Item onClick={() => updateSort("top")}>
                <span>{sort === "top" && <DoubleRightOutlined />} Top</span>
            </Menu.Item>
        </Menu>
    )

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
                        <div className="flex flex-row justify-evenly accent mb-2 rounded p-2">
                            {postBox && (
                                <PostBox
                                    feed={id}
                                    action={() => {
                                        dispatch(feedClear(id))
                                        loadMore()
                                    }}
                                />
                            )}

                            <Dropdown overlay={menu}>
                                <a className="cursor-pointer text-gray-100 hover:text-gray-300">
                                    Sort by{" "}
                                    {sort[0].toUpperCase() + sort.substring(1)}
                                </a>
                            </Dropdown>

                            <ButtonText onClick={() => dispatch(feedClear(id))}>
                                Reload
                            </ButtonText>
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
                                    loadMore={loadMore}
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
