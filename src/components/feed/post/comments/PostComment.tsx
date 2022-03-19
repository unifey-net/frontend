import React, { useEffect, useRef, useState } from "react"
import { Avatar, Button, Input, InputRef, message } from "antd"
import { Link } from "react-router-dom"
import { getImageUrl } from "../../../../api/user/User"
import PostVote from "../PostVote"
import PostReply from "../PostReply"
import { useSelector, useDispatch } from "react-redux"
import PostAbout from "../PostAbout"
import PostManagement from "../PostManagement"
import { useEditingStatus, updateCommentContent } from "../../../../api/Feeds"
import { parseBody } from "../../../../api/Emotes"
import useEmotes from "../../../../api/community/useEmotes"
import styled from "styled-components"
import { useAppDispatch } from "../../../../util/Redux"
import { stopEditing } from "../../../../redux/editor.redux"

const Comment = styled.div<{ indent: number }>`
    margin-left: ${({ indent }) => (indent - 1) * 50}px;
    display: flex;
    flex-direction: column;
    padding: 16px;

    .edit-button {
        margin-top: 8px;
    }

    .comment-footer {
        display: flex;
        flex-direction: row;
    }

    .comment-head {
        .comment-user {
            a {
                margin-right: 6px;
            }
        }
        display: flex;
        gap: 20px;
        flex-direction: row;
        justify-content: space-between;
    }
`

/**
 * Post comments.
 */
const PostComment: React.FC<{ comment: any }> = ({ comment, children }) => {
    const [content, setContent] = useState(comment.comment.content)
    const [loading, setLoading] = useState(false)

    const textAreaRef = React.createRef<InputRef>()

    const post = useSelector((state: any) => state.post)
    const dispatch = useAppDispatch()

    let emotes = useEmotes()

    const editing = useEditingStatus(comment.comment.id)

    const updateContent = async () => {
        setLoading(true)

        let element = document.getElementById(
            `${comment.comment.id}_content`
        ) as HTMLTextAreaElement
        let value = element?.value

        if (value === null || !value || content === value || value === "") {
            setLoading(false)
            return
        }

        let request = await updateCommentContent(
            comment.comment.feed,
            post,
            comment.comment.id,
            value
        )

        if (request.status !== 200) {
            message.error(request.data.payload)
            return
        } else {
            message.success("Comment has been successfully updated!")
            setContent(value)
            dispatch(stopEditing())
        }

        setLoading(false)
    }

    return (
        <>
            <Comment indent={comment.comment.level}>
                <div className="comment-head">
                    <div className="comment-user">
                        <Link
                            to={`/u/${comment.author.username}`}
                        >
                            {comment.author.username}
                        </Link>

                        <Avatar
                            src={getImageUrl(comment.author.username)}
                            alt={`Profile Picture`}
                        />
                    </div>
                    <p>-</p>
                    <PostAbout date={comment.comment.createdAt} />
                </div>
                <div className="comment-body">
                    {editing && (
                        <>
                            <Input.TextArea
                                ref={textAreaRef}
                                id={`${comment.comment.id}_content`}
                            />
                            <Button onClick={updateContent} className="edit-button" loading={loading}>
                                Done
                            </Button>
                        </>
                    )}

                    {!editing && (
                        <p
                            dangerouslySetInnerHTML={{
                                __html: parseBody(content, emotes),
                            }}
                        />
                    )}
                </div>
                <div className="comment-footer">
                    <PostVote
                        postType="comment"
                        post={comment.comment}
                        vote={comment.vote}
                    />
                    <PostReply
                        level={1}
                        post={post}
                        feed={comment.comment.feed}
                        id={
                            comment.comment.level === 1
                                ? comment.comment.id
                                : comment.comment.parent
                        }
                        isOnComment={true}
                    />
                    <PostManagement type="comment" object={comment.comment} />
                </div>
            </Comment>
            {children}
        </>
    )
}

export default PostComment
