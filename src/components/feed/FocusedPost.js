import React, { useState, useEffect } from "react";
import { Spin, Comment, Avatar, Button } from "antd";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getPost } from "../../api/Feeds";
import Post from "./Post"
import PostComment from "./PostComment";
import History from "../../api/History";

export default function FocusedPost(props) {
    const { id, feed, base } = props

    let [loaded, setLoaded] = useState(false)
    let [post, setPost] = useState({})

    useEffect(() => {
        const loadPost = async () => {
            let req = await getPost(feed, id)

            if (req.status === 200) {
                setPost(req.data);
            }

            setLoaded(true)
        }

        loadPost()
    }, [id, feed])

    return (
        <>
            {loaded && (
                <>
                    <Button ghost onClick={() => History.go(-2)}>
                        <ArrowLeftOutlined />
                    </Button>

                    <Post
                        type="focused"
                        author={post.author}
                        post={post.post}
                        vote={post.vote}
                        feed={feed}
                    />
                </>
            )}

            {!loaded && <Spin indicator={<LoadingOutlined />} />}
        </>
    );
}