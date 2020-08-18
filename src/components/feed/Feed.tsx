import React, { useState, useEffect } from "react";
import PostJsx from "./post/Post";
import { Spin, Dropdown, Menu, Button, Alert, Empty } from "antd";
import { LoadingOutlined, DoubleRightOutlined, ReloadOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import PostBox from "./PostBox";
import { getFeedPosts, useFeed } from "../../api/Feeds";
import FocusedPost from "./post/FocusedPost";
import { useDispatch } from "react-redux";
import {
    feedClear,
    loadPost,
    bumpPage,
    changeSort,
} from "../../redux/actions/feeds.actions";
import debug from "../../api/Debug";
import { Emote } from "../../api/Emotes";

type Props = {
    id: string;
    postBox?: any;
    focus?: number
};

export default ({ id, focus, postBox }: Props) => {
    let dispatch = useDispatch();

    let [feed, status] = useFeed(id);

    debug("%o", [status])

    let [sort, setSort] = useState("new");

    /**
     * Handle sorting.
     */
    useEffect(() => {
        let querySort = new URL(window.location.toString()).searchParams.get(
            "sort"
        );

        if (querySort === "new" || querySort === "old" || querySort === "top") {
            dispatch(
                changeSort({
                    sort: querySort.toLowerCase(),
                    id
                })
            );
        }
    }, [dispatch, id]);

    /**
     * Load another post.
     */
    const loadMore = async () => {
        debug(`Loading more posts from ${id} (page: ${feed!!.page})`)

        let resp = await getFeedPosts(id, sort, feed!!.page);

        switch (resp.status) {
            case 200: {
                dispatch(bumpPage(id));

                let posts = resp.data.posts;

                dispatch(
                    loadPost({
                        posts,
                        sort,
                        id,
                    })
                );

                break;
            }

            case 401: {
                // TODO

                break;
            }

            default: {
                break;
            }
        }
    };

    /**
     * The sort menu management.
     */
    const menu = (
        <Menu>
            <Menu.Item>
                <Button type="link" onClick={() => setSort("new")}>
                    {sort === "new" && (
                        <>
                            <DoubleRightOutlined /> New
                        </>
                    )}

                    {sort !== "new" && <>New</>}
                </Button>
            </Menu.Item>
            <Menu.Item>
                <Button type="link" onClick={() => setSort("old")}>
                    {sort === "old" && (
                        <>
                            <DoubleRightOutlined /> Old
                        </>
                    )}

                    {sort !== "old" && <>Old</>}
                </Button>
            </Menu.Item>
            <Menu.Item>
                <Button type="link" onClick={() => setSort("top")}>
                    {sort === "top" && (
                        <>
                            <DoubleRightOutlined /> Top
                        </>
                    )}

                    {sort !== "top" && <>Top</>}
                </Button>
            </Menu.Item>
        </Menu>
    );

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
                            {!focus && (
                                <div className="flex flex-row justify-evenly">
                                    {postBox && (
                                        <PostBox
                                            feed={id}
                                            action={() => {
                                                dispatch(feedClear(id));
                                                loadMore();
                                            }}
                                        />
                                    )}

                                    <Dropdown overlay={menu}>
                                        <Button
                                            type="link"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Sort by{" "}
                                            {sort[0].toUpperCase() +
                                                sort.substring(1)}
                                        </Button>
                                    </Dropdown>

                                    <Button type="link" onClick={() => dispatch(feedClear(id))}>
                                        <ReloadOutlined/>
                                    </Button>
                                </div>
                            )}

                            {focus && <FocusedPost feed={id} id={focus} />}

                            {!focus && (
                                    <InfiniteScroll
                                        loadMore={loadMore}
                                        hasMore={
                                            feed.feed.pageCount >= feed.page
                                        }
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
    );
};
