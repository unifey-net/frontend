import React from "react";
import { Avatar, Comment } from "antd";
import { AccountBookOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../api/user/User";
import PostVote from "./PostVote";

export default function PostComment(props) {
    let { comment, children } = props;

    return (
        <Comment
            actions={[
                <PostVote
                    type="comment"
                    post={comment.comment}
                    voteObj={comment.vote}
                />,
                <span key="comment-nested-reply-to" className="ml-4">Reply to</span>,
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
