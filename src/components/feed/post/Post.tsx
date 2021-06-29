import React, { useState } from "react"
import { message, Button, Input } from "antd"
import { useDispatch } from "react-redux"
import PostComments from "./comments/PostComments"
import PostVote from "./PostVote"
import History from "../../../api/History"
import PostReply from "./PostReply"
import {
    Post,
    useEditingStatus,
    updatePostContent,
    updatePostTitle,
    PostResponse,
} from "../../../api/Feeds"
import Vote from "../../../api/user/Vote"
import { User } from "../../../api/user/User"
import { parseBody } from "../../../api/Emotes"
import PostAbout from "./PostAbout"
import UserView from "../../view/UserView"
import PostManagement from "./PostManagement"
import { stopEditing } from "../../../redux/actions/editor.actions"
import TextArea from "antd/lib/input/TextArea"
import useEmotes from "../../../api/community/useEmotes"
import useSortChanger from "../SortChanger"
import styled from "styled-components"
import PostTag from "./PostTag"
import { media } from "../../../api/util/Media"

type Props = {
    postResponse: PostResponse
    type?: string
}

const PostStyle = styled.div`
    background-color: ${({ theme }) => theme.primary};
    ${media("max-width: 500px;", "width: 500px;", "width: 500px;")}
    border-radius: 32px;

    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    .post-header {
        padding-right: 32px;
        padding-left: 32px;
        padding-top: 16px;

        .post-title {
            color: white;
        }

        .user-view {
            align-items: flex-start;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            gap: 8px;
        }

        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;

        background-color: ${({ theme }) => theme.secondary};
        border-radius: 32px 32px 0 0;
    }

    .post-content {
        padding: 16px;
    }

    .post-footer {
        justify-content: space-between;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 16px;
        display: flex;
        flex-direction: row;
        background-color: ${({ theme }) => theme.secondary};
        border-radius: 0 0 32px 32px;
    }
`

/**
 * A post
 */
export default ({ postResponse, type }: Props) => {
    const { post, vote, author } = postResponse
    const feed = post.feed

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    let emotes = useEmotes()
    const editing = useEditingStatus(post.id)
    const dispatch = useDispatch()

    const [sort, button] = useSortChanger("TOP")

    /**
     * Complete editing.
     */
    const completeEditing = () => {
        dispatch(stopEditing())
    }

    /**
     * When the post content changes.
     */
    const onContentChange = async (data: string) => {
        if (data === title || data === "") {
            return
        }

        let request = await updatePostContent(feed, post.id, data)

        if (request.status !== 200) {
            message.error(request.data.payload)
        } else {
            message.success("Content has been successfully changed!")
        }

        setContent(data)
    }

    /**
     * When the post title changes.
     */
    const onTitleChange = async (data: string) => {
        if (data === title || data === "") {
            return
        }

        let request = await updatePostTitle(feed, post.id, data)

        if (request.status !== 200) {
            message.error("There was an issue updating the title")
        } else {
            message.success("Title has been successfully changed!")
        }

        setTitle(data)
    }

    const editUpdate = async () => {
        let content = document.getElementById(
            `${post.id}_${author.id}_content`
        ) as HTMLInputElement

        let title = document.getElementById(
            `${post.id}_${author.id}_title`
        ) as HTMLInputElement

        onContentChange(content.value)
        onTitleChange(title.value)

        completeEditing()
    }

    /**
     * Update focus.
     */
    const updateFocus = () => {
        History.push(`${window.location.pathname}/${post.id}`)
    }

    return (
        <PostStyle>
            <div className="post-header">
                <div className="user-view">
                    <p>{author.username}</p>

                    <PostTag>Tag</PostTag>
                </div>

                <span className="post-title" onClick={() => updateFocus()}>
                    {post.title}
                </span>

                <PostAbout date={post.createdAt} />
            </div>
            <div className="post-content">
                <p
                    className="post-body"
                    dangerouslySetInnerHTML={{
                        __html: parseBody(content, emotes),
                    }}
                />
            </div>
            <div className="post-footer">
                <PostVote post={post} vote={vote} />

                <PostManagement type="post" object={post} />
            </div>

            {/* {type === "focused" && (
                <>
                    <div className="flex flex-row justify-between">
                        <PostReply
                            post={post.id}
                            id={post.id}
                            level={0}
                            feed={post.feed}
                        />

                        {button}
                    </div>

                    <PostComments
                        feed={post.feed}
                        id={post.id}
                        sort={sort}
                        data={null}
                    />
                </>
            )} */}
        </PostStyle>
    )
}