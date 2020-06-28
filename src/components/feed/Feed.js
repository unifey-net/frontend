import React, { useState, useEffect } from "react";
import Post from "./Post.js";
import "../../assets/scss/pages/feed.scss";
import { getToken } from "../../api/user/User";

import { Empty, Skeleton, Alert } from "antd";

import PostBox from "./PostBox";
import { BASE_URL } from "../../api/ApiHandler";

export default function Feed(props) {
    let [posts, setPosts] = useState({
        loaded: false,
        posts: [],
        permission: true,
    });

    const loadPosts = async () => {
        let resp = await fetch(`${BASE_URL}/feeds/${props.id}`, {
            method: "GET",
            headers: {
                Authorization: "bearer " + getToken(),
            },
        });

        if (resp.ok) {
            let data = await resp.json();

            let js = data.posts;

            let posts = [];
            for (let i = 0; js.length > i; i++) {
                let post = js[i];

                posts.push(post);
            }

            posts.sort(function (a, b) {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });

            setPosts((prevState) => {
                return {
                    ...prevState,
                    posts: posts,
                    loaded: true,
                    permission: true,
                };
            });
        } else {
            setPosts((prevState) => {
                return {
                    ...prevState,
                    loaded: true,
                    permission: false,
                };
            });
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <div>
            {props.postBox && <PostBox feed={props.id} action={loadPosts} />}
            <ul className="feed-container">
                {posts.loaded && posts.permission && posts.posts.length === 0 && <Empty />}

                {posts.loaded && posts.permission && posts.length !== 0 && (
                    <>
                        {posts.posts.map((post, index) => (
                            <li key={index}>
                                <Post
                                    id={post.post.id}
                                    created={post.post.createdAt}
                                    title={post.post.title}
                                    content={post.post.content}
                                    vote={
                                        post.post.upvotes - post.post.downvotes
                                    }
                                    author={post.owner.username}
                                />
                            </li>
                        ))}
                    </>
                )}

                {!posts.permission && (
                    <Alert message="You cannot view this feed." type="error" />
                )}

                {!posts.loaded && (
                    <>
                        <Skeleton
                            title={{ width: "12rem" }}
                            paragraph={{ width: "26rem", rows: 4 }}
                        />
                        <Skeleton
                            title={{ width: "12rem" }}
                            paragraph={{ width: "26rem", rows: 4 }}
                        />
                        <Skeleton
                            title={{ width: "12rem" }}
                            paragraph={{ width: "26rem", rows: 4 }}
                        />
                        <Skeleton
                            title={{ width: "12rem" }}
                            paragraph={{ width: "26rem", rows: 4 }}
                        />
                    </>
                )}
            </ul>
        </div>
    );
}
