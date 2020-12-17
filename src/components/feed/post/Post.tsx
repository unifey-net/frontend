import React, { useState, useEffect } from "react"
import { message, Button, Input } from "antd"
import { useDispatch } from "react-redux"
import { getCommunityById } from "../../../api/community/Community"
import PostComments from "./comments/PostComments"
import PostVote from "./PostVote"
import History from "../../../api/History"
import PostReply from "./PostReply"
import {
    Post,
    useEditingStatus,
    updatePostContent,
    updatePostTitle,
} from "../../../api/Feeds"
import Vote from "../../../api/user/Vote"
import { User } from "../../../api/user/User"
import { parseBody, Emote } from "../../../api/Emotes"
import PostAbout from "./PostAbout"
import UserView from "../../view/UserView"
import PostManagement from "./PostManagement"
import { stopEditing } from "../../../redux/actions/editor.actions"
import TextArea from "antd/lib/input/TextArea"
import useEmotes from "../../../api/community/useEmotes"
import debug from "../../../api/Debug"

type Props = {
    post: Post
    vote: Vote | null
    author: User
    type?: string
    feed: string
}

/**
 * A post
 */
export default ({ post, vote, author, type, feed }: Props) => {
    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    let emotes = useEmotes()
    const editing = useEditingStatus(post.id)
    const dispatch = useDispatch()

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
        <>
            <div
                className={
                    (type === "focused" ? "p-4" : "px-4 pt-4") +
                    " accent rounded my-4 max-w-xs md:max-w-sm lg:max-w-md"
                }
            >
                <div className="flex flex-row justify-between">
                    {type !== "focused" && (
                        <span
                            className="text-lg text-blue-400 hover:text-blue-600 cursor-pointer"
                            onClick={() => updateFocus()}
                        >
                            {post.title}
                        </span>
                    )}

                    {type === "focused" && (
                        <>
                            {editing && (
                                <Input
                                    id={`${post.id}_${author.id}_title`}
                                    defaultValue={title}
                                    style={{
                                        marginBottom: ".5rem",
                                    }}
                                />
                            )}

                            {!editing && <p className="text-lg">{title}</p>}
                        </>
                    )}

                    <UserView username={author.username} />
                </div>
                <div className="post-content">
                    {editing && (
                        <>
                            <TextArea
                                id={`${post.id}_${author.id}_content`}
                                defaultValue={content}
                                style={{
                                    marginBottom: ".5rem",
                                }}
                            />

                            <Button
                                type="primary"
                                onClick={editUpdate}
                                style={{
                                    marginBottom: ".5rem",
                                }}
                            >
                                Update
                            </Button>
                        </>
                    )}

                    {!editing && (
                        <p
                            className={type === "focused" ? "" : "truncate"}
                            dangerouslySetInnerHTML={{
                                __html: parseBody(content, emotes),
                            }}
                        />
                    )}
                </div>
                <div className="flex flex-row justify-between gap-4">
                    <PostVote post={post} vote={vote} />

                    <PostAbout date={post.createdAt} />

                    <PostManagement type="post" object={post} />
                </div>

                {type === "focused" && (
                    <>
                        <PostReply
                            post={post.id}
                            id={post.id}
                            level={0}
                            feed={post.feed}
                        />

                        <PostComments
                            feed={post.feed}
                            id={post.id}
                            data={null}
                        />
                    </>
                )}
            </div>
        </>
    )
}
