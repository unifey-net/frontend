import React, { useState, useEffect } from "react"
import { Spin, Button } from "antd"
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import History from "../../../api/History"
import { updatePost } from "../../../redux/actions/post.actions"
import Post from "./Post"
import { API } from "../../../api/ApiHandler"
import styled from "styled-components"
import PostComments from "./comments/PostComments"
import PostReply from "./PostReply"
import useSortChanger from "../SortChanger"

const FocusedPostStyle = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`

/**
 * A fullscreen post.
 */
const FocusedPost: React.FC<{ postId: number; feed: string }> = ({ postId, feed })  => {
    const dispatch = useDispatch()

    const [sort, button] = useSortChanger("TOP")
    let [loaded, setLoaded] = useState(false)
    let [post, setPost] = useState({} as any)

    useEffect(() => {
        const loadPost = async () => {
            let req = await API.get(`/feeds/${feed}/post/${postId}`)

            if (req.status === 200) {
                dispatch(updatePost(postId))
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
        <FocusedPostStyle>
            <Button ghost onClick={() => History.go(-1)}>
                <ArrowLeftOutlined />
            </Button>

            <Post postResponse={post} allowFocusChange={false} />

            <div>
                <PostReply
                    post={postId}
                    id={postId}
                    level={0}
                    feed={feed}
                />

                {button}
            </div>

            <PostComments
                feed={feed}
                id={postId}
                sort={sort}
                data={null}
            />
        </FocusedPostStyle>
    )
}

export default FocusedPost;