import React, { useState, useEffect } from "react"
import { signedIn } from "../../../api/user/User"
import { votePost, voteComment } from "../../../api/Feeds"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import { Tooltip, message } from "antd"
import { useSelector } from "react-redux"
import Vote from "../../../api/user/Vote"
import { Post } from "../../../api/Feeds"
import styled from "styled-components"

type Props = {
    vote: Vote | null
    post: Post
    postType?: string
}

const PostStyle = styled.div<{ hasUpVoted: boolean; hasDownVoted: boolean }>`
    display: flex;
    flex-direction: row;
    gap: 4px;

    .upvote {
        color: ${({ hasUpVoted }) => (hasUpVoted ? "#d9a521;" : "inherit;")};
    }

    .downvote {
        color: ${({ hasDownVoted }) => (hasDownVoted ? "#d9a521;" : "inherit;")};
    }
`

const PostVote: React.FC<Props> = ({ vote, post, postType }) => {
    let [number, setNumber] = useState(post.upvotes - post.downvotes)

    let [hasDownVoted, setDownVoted] = useState(false)
    let [hasUpVoted, setUpVoted] = useState(false)

    let postId = useSelector((store: any) => store.post)

    useEffect(() => {
        if (vote !== null) {
            switch (vote.vote) {
                case 1: {
                    setUpVoted(() => true)
                    break
                }

                case 0: {
                    setDownVoted(() => true)
                    break
                }

                default: {
                    break
                }
            }
        }
    }, [vote])

    /**
     * Update the vote on the backend.
     * @param {int} type
     */
    const sendVote = async (type: number) => {
        if (!signedIn()) {
            return
        }

        let response

        if (postType === "comment") {
            response = await voteComment(post.feed, postId, type, post.id)
        } else {
            response = await votePost(post.feed, post.id, type)
        }

        if (response.status !== 200) {
            message.error("There was an issue upvoting that post!")
        }
    }

    const upVote = () => {
        if (!signedIn()) {
            return
        }

        if (hasUpVoted) {
            setNumber(prevVote => prevVote - 1)
            setUpVoted(false)

            sendVote(-1)
        } else if (hasDownVoted) {
            setNumber(prevVote => prevVote + 2)
            setUpVoted(true)
            setDownVoted(false)

            sendVote(1)
        } else {
            setNumber(prevVote => prevVote + 1)
            setUpVoted(true)

            sendVote(1)
        }
    }

    const downVote = () => {
        if (!signedIn()) {
            return
        }

        if (hasUpVoted) {
            setNumber(prevVote => prevVote - 2)

            setDownVoted(true)
            setUpVoted(false)

            sendVote(0)
        } else if (hasDownVoted) {
            setNumber(prevVote => prevVote + 1)

            setDownVoted(false)

            sendVote(-1)
        } else {
            setNumber(prevVote => prevVote - 1)

            setDownVoted(true)

            sendVote(0)
        }
    }

    return (
        <PostStyle hasDownVoted={hasDownVoted} hasUpVoted={hasUpVoted}>
            <p className="upvote">
                <Tooltip title="Upvote this post">
                    <UpOutlined onClick={upVote} />
                </Tooltip>
            </p>

            <p>{number}</p>

            <p className="downvote">
                <Tooltip title="Downvote this post">
                    <DownOutlined onClick={downVote} />
                </Tooltip>
            </p>
        </PostStyle>
    )
}

export default PostVote;