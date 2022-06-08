import React, { useState, useEffect } from "react"
import { Spin, Button } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import Post from "./Post"
import { API } from "../../../api/ApiHandler"
import styled from "styled-components"
import PostComments from "./comments/PostComments"
import PostReply from "./PostReply"
import useSortChanger from "../SortChanger"
import { MdArrowLeft } from "react-icons/md"
import { postSlice } from "../../../api/Feeds"
import { useNavigate } from "react-router-dom"

const FocusedPostStyle = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 32px;

    .focused-post-options {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
    }
`

/**
 * A fullscreen post.
 */
const FocusedPost: React.FC<{ postId: number; feed: string }> = ({
    postId,
    feed,
}) => {
    const nav = useNavigate()
    const dispatch = useDispatch()

    const [sort, button] = useSortChanger("TOP")
    let [loaded, setLoaded] = useState(false)
    let [post, setPost] = useState({} as any)

    useEffect(() => {
        const loadPost = async () => {
            let req = await API.get(`/feeds/${feed}/post/${postId}`)

            if (req.status === 200) {
                dispatch(postSlice.actions.setPost({ post: postId }))
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
            <Post
                postResponse={post}
                focusChange={false}
                disableBottomBorderRadius={true}
            />

            <div className="focused-post-options">
                <Button ghost onClick={() => nav(-1)}>
                    <MdArrowLeft />
                </Button>

                <PostReply
                    post={postId}
                    id={postId}
                    level={0}
                    feed={feed}
                    isOnComment={false}
                />

                <button onClick={button}>Sort by {sort}</button>
            </div>

            <PostComments feed={feed} id={postId} sort={sort} data={null} />
        </FocusedPostStyle>
    )
}

export default FocusedPost
