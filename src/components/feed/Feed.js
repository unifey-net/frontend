import React, { useState, useEffect } from "react";
import Post from "./Post.js";
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
import { getFeed, getFeedPosts } from "../../api/Feeds.js";

export default function Feed(props) {
    let [posts, setPosts] = useState([]);
    let [status, setStatus] = useState(-1);
    let [sort, setSort] = useState("new");
    let [page, setPage] = useState({
        page: 1,
        maxPage: -1,
    });

    useEffect(() => {
        const loadFeed = async () => {
            let resp = await getFeed(props.id)

            if (resp.status === 200) {
                setPage({
                    page: 1,
                    maxPage: resp.data.pageCount,
                });

                setStatus(0);
            } else {
                setStatus(1);
            }
        };

        loadFeed();
    }, [props.id]);
    
    useEffect(() => {
        setPosts([]);

        setPage((state) => {
            return {
                ...state,
                page: 1,
            };
        });
    }, [sort]);

    useEffect(() => {
        let querySort = new URL(window.location).searchParams.get("sort");

        if (querySort === "new" || querySort === "old" || querySort === "top") {
            setSort(querySort)
        }
    }, [])

    /**
     * Load another post.
     */
    const loadMore = async () => {
        let resp = await getFeedPosts(props.id, sort, page.page)

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
                setStatus(1);
                break;
            }

            default: {
                break;
            }
        }
    };

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
            <div className="flex flex-row justify-evenly">
                {props.postBox && <PostBox feed={props.id} action={() => {}} />}

                <Dropdown overlay={menu}>
                    <Button type="link" onClick={(e) => e.preventDefault()}>
                        Sort by {sort[0].toUpperCase() + sort.substring(1)}
                    </Button>
                </Dropdown>
            </div>

            {status === 1 && (
                <Alert message="You cannot view this feed." type="error" />
            )}

            {page.maxPage === 0 && (
                <Empty
                    style={{ minWidth: "200px" }}
                    description={<p>There are no posts in this feed.</p>}
                />
            )}

            {status === 0 && page.maxPage !== 0 && (
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={page.maxPage >= page.page}
                    loader={<Spin key={0} indicator={<LoadingOutlined />} />}
                >
                    <ul className="feed-container">
                        {posts.map((post, index) => (
                            <li key={index}>
                                <Post
                                    author={post.owner}
                                    post={post.post}
                                    vote={post.vote}
                                    feed={props.id}
                                />
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
            )}

            {!status === -1 && (
                <>
                    <Spin indicator={<LoadingOutlined />} />
                </>
            )}
        </div>
    );
}
