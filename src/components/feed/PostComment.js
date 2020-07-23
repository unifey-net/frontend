import React from "react";
import { Avatar, Comment } from "antd";
import { AccountBookOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../api/user/User";
import PostVote from "./PostVote";
import PostReply from "./PostReply";
import { useSelector } from "react-redux";

export default function PostComment({ comment, children }) {
    const post = useSelector((state) => state.post);

    return (
        <Comment
            actions={[
                <PostVote
                    postType="comment"
                    post={comment.comment}
                    voteObj={comment.vote}
                />,
                <PostReply
                    level={1}
                    post={post}
                    feed={comment.comment.feed}
                    id={
                        comment.comment.level === 1
                            ? comment.comment.id
                            : comment.comment.parent
                    }
                />,
            ]}
            author={
                <Link to={`/u/${comment.author.username}`}>
                    {comment.author.username}
                </Link>
            }
            avatar={
                <Avatar
                    src={getImageUrl(comment.author.username)}
                    alt={`Profile Picture`}
                />
            }
            content={
                <p
                    dangerouslySetInnerHTML={{
                        __html: comment.comment.content,
                    }}
                />
            }
        >
            {children}
        </Comment>
    );
}
