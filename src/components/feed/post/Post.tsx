import React from "react"
import PostVote from "./PostVote"
import History from "../../../api/History"
import {
    PostResponse,
} from "../../../api/Feeds"
import { parseBody } from "../../../api/Emotes"
import PostAbout from "./PostAbout"
import PostManagement from "./PostManagement"
import useEmotes from "../../../api/community/useEmotes"
import styled from "styled-components"
import PostTag from "./PostTag"
import { media } from "../../../api/util/Media"

type Props = {
    postResponse: PostResponse,
    allowFocusChange?: boolean
}

const PostStyle = styled.div<{ allowFocusChange: boolean }>`
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
            cursor: ${({ allowFocusChange }) => allowFocusChange ? "pointer" : "inherit"};
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
export default ({ postResponse, allowFocusChange }: Props) => {
    const { post, vote, author } = postResponse
    let emotes = useEmotes()

    /**
     * Update focus.
     */
    const updateFocus = () => {
        if (allowFocusChange)
            History.push(`${window.location.pathname}/${post.id}`)
    }

    return (
        <PostStyle allowFocusChange={allowFocusChange === true}>
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
                        __html: parseBody(post.content, emotes),
                    }}
                />
            </div>
            <div className="post-footer">
                <PostVote post={post} vote={vote} />

                <PostManagement type="post" object={post} />
            </div>
        </PostStyle>
    )
}