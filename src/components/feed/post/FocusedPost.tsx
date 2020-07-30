import React, { useState, useEffect } from "react";
import { Spin, Comment, Avatar, Button } from "antd";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../../api/Feeds";
import History from "../../../api/History";
import { updatePost } from "../../../redux/actions/post.actions"
import Post from "./Post";

type Props = {
    id: number,
    feed: string
}

export default ({ id, feed }: Props): JSX.Element => {
    const dispatch = useDispatch()
    let [loaded, setLoaded] = useState(false);
    let [post, setPost] = useState({} as any);

    useEffect(() => {
        const loadPost = async () => {
            let req = await getPost(feed, id);

            if (req.status === 200) {
                dispatch(updatePost(id))
                setPost(req.data);
            }

            setLoaded(true);
        };

        loadPost();
    }, [id, feed]);

    return (
        <>
            {loaded && (
                <>
                    <Button ghost onClick={() => History.go(-1)}>
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