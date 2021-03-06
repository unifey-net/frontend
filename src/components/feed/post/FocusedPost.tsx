import React, { useState, useEffect } from "react"
import { Spin, Button } from "antd"
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { getPost } from "../../../api/Feeds"
import History from "../../../api/History"
import { updatePost } from "../../../redux/actions/post.actions"
import Post from "./Post"

/**
 * A fullscreen post.
 */
const FocusedPost: React.FC<{ id: number; feed: string }> = ({ id, feed }) => {
    const dispatch = useDispatch()

    let [loaded, setLoaded] = useState(false)
    let [post, setPost] = useState({} as any)

    useEffect(() => {
        const loadPost = async () => {
            let req = await getPost(feed, id)

            if (req.status === 200) {
                dispatch(updatePost(id))
                setPost(req.data)
            }

            setLoaded(true)
        }

        loadPost()
    }, [id, feed, dispatch])

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
    )
}

export default FocusedPost;