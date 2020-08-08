import React, { useState, useEffect } from "react";
import PostJsx from "./post/Post";
import { getToken } from "../../api/user/User";
import { Spin, Dropdown, Menu, Button, Alert, Skeleton, Empty } from "antd";
import {
    LoadingOutlined,
    DownOutlined,
    DoubleRightOutlined,
    DoubleLeftOutlined,
} from "@ant-design/icons";
import { BASE_URL } from "../../api/ApiHandler";
import InfiniteScroll from "react-infinite-scroller";
import PostBox from "./PostBox";
import { getFeed, getFeedPosts, getPost, Post } from "../../api/Feeds";
import FocusedPost from "./post/FocusedPost";

type Props = {
    id: string,
    postBox?: any,
    focus?: number
}

export default ({ id, focus, postBox }: Props): JSX.Element => {
    let [posts, setPosts] = useState([] as any[]);
    let [status, setStatus] = useState({ status: -1, message: "" });
    let [sort, setSort] = useState("new");
    let [page, setPage] = useState({
        page: 1,
        maxPage: -1,
    });

    /**
     * Load the feed.
     */
    useEffect(() => {
        const loadFeed = async () => {
            let resp = await getFeed(id)

            if (resp.status === 200) {
                setPage({
                    page: 1,
                    maxPage: resp.data.pageCount,
                });

                setStatus((prev) => { 
                    return {
                        ...prev,
                        status: 0
                    }
                })
            } else {
                setStatus((prev) => {
                    return {
                        ...prev,
                        message: resp.data.payload,
                        status: 1
                    };
                });
            }
        };

        loadFeed();
    }, [id]);
    
    /**
     * Clear posts when the sort changes.
     */
    useEffect(() => {
        setPosts([]);

        setPage((state) => {
            return {
                ...state,
                page: 1,
            };
        });
    }, [sort]);

    /**
     * Handle sorting.
     */
    useEffect(() => {
        let querySort = new URL(window.location.toString()).searchParams.get("sort");

        if (querySort === "new" || querySort === "old" || querySort === "top") {
            setSort(querySort)
        }
    }, [])

    /**
     * Load another post.
     */
    const loadMore = async () => {
        let resp = await getFeedPosts(id, sort, page.page)

        switch (resp.status) {
            case 200: {
                setPage((prevState) => {
                    return {
                        ...prevState,
                        page: prevState.page + 1,
                    };
                })

                let posts = resp.data.posts;

                setPosts((prevState) => {
                    return [...prevState, ...posts];
                });

                break;
            }

            case 401: {
                setStatus((prev) => {
                    return {
                        ...prev,
                        status: 0,
                        message: resp.data.payload
                    };
                });

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
            {status.status === 1 && (
                <Alert
                    message="You cannot view this feed."
                    description={status.message}
                    type="error"
                    showIcon
                />
            )}

            {page.maxPage === 0 && (
                <Empty
                    style={{ minWidth: "200px" }}
                    description={<p>There are no posts in this feed.</p>}
                />
            )}

            {status.status === 0 && page.maxPage !== 0 && (
                <>
                    {!focus && (
                        <div className="flex flex-row justify-evenly">
                            {postBox && (
                                <PostBox
                                    feed={id}
                                    action={() => {
                                        setPosts([]);
                                        setPage((prev) => ({
                                            ...prev,
                                            page: 1,
                                        }));
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
                                    {sort[0].toUpperCase() + sort.substring(1)}
                                </Button>
                            </Dropdown>
                        </div>
                    )}

                    {focus && <FocusedPost feed={id} id={focus} />}

                    {!focus && (
                        <>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={loadMore}
                                hasMore={page.maxPage >= page.page}
                                loader={
                                    <Spin
                                        key={0}
                                        indicator={<LoadingOutlined />}
                                    />
                                }
                            >
                                <ul className="feed-container">
                                    {posts.map((post, index) => (
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
                        </>
                    )}
                </>
            )}
        </div>
    );
}
