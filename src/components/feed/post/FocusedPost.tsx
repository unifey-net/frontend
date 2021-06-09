import React, { useState, useEffect } from "react"
import { Spin, Button } from "antd"
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { getPost, PostResponse } from "../../../api/Feeds"
import History from "../../../api/History"
import { updatePost } from "../../../redux/actions/post.actions"
import Post from "./Post"
import { API } from "../../../api/ApiHandler"

/**
 * A fullscreen post.
 */
const FocusedPost: React.FC<{ postId: number; feed: string }> = ({ postId, feed })  => {
    const dispatch = useDispatch()

    let [loaded, setLoaded] = useState(false)
    let [post, setPost] = useState({} as any)

    useEffect(() => {
        const loadPost = async () => {
            let req = await API.get(`/feeds/${feed}/post/${post}`)

            if (req.status === 200) {
                dispatch(updatePost(post))
                setPost(req.data)
            }

            setLoaded(true)
        }

        loadPost()
    }, [postId, feed, dispatch])

    if (!loaded) {
        return <Spin indicator={<LoadingOutlined />} />
    }

    return (
        <>
            <Button ghost onClick={() => History.go(-1)}>
                <ArrowLeftOutlined />
            </Button>

            <Post type="focused" postResponse={post} />
        </>
    )
}

export default FocusedPost;