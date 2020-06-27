import React, { useState, useEffect } from "react";
import Post from "./Post.js";
import "../assets/scss/pages/feed.scss";
import { getToken } from "../api/AuthenticationManager";

import { Empty, Skeleton } from "antd"

import PostBox from "./PostBox";
import { BASE_URL } from "../api/ApiHandler";
import { LoadingOutlined } from "@ant-design/icons";

export default function Feed(props) {
    let [posts, setPosts] = useState([]);
    let [loadedPosts, setLoadedPosts] = useState(false)

    const loadPosts = async () => {
        let resp = await fetch(`${BASE_URL}/feeds/${props.id}`, {
            method: "GET",
            headers: {
                Authorization: "bearer " + getToken(),
            },
        }).then((resp) => resp.json());

        let js = resp.posts;

        let posts = [];
        for (let i = 0; js.length > i; i++) {
            let post = js[i];

            posts.push(post);
        }

        posts.sort(function (a, b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });

        setPosts(posts);
        setLoadedPosts(true)
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <div>
            <PostBox feed={props.id} action={loadPosts} />
            <ul className="feed-container">
                {loadedPosts && posts.length === 0 && <Empty />}

                {loadedPosts && posts.length !== 0 && (
                    <>
                        {posts.map((post, index) => (
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

                {!loadedPosts && (
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
