import React from "react";
import { Avatar, Comment } from "antd";
import { AccountBookOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../../api/user/User";
import PostVote from "../PostVote";
import PostReply from "../PostReply";
import { useSelector } from "react-redux";
import PostAbout from "../PostAbout";

type Props = {
    comment: any,
    children: any
}

export default function PostComment({ comment, children }: Props): JSX.Element {
    const post = useSelector((state: any) => state.post);

    return (
        <Comment
            actions={[
                <PostVote
                    postType="comment"
                    post={comment.comment}
                    vote={comment.vote}
                />,
                <PostReply
                    level={1}
                    post={post}
                    feed={comment.comment.feed}
                    noStyle={true}
                    id={
                        comment.comment.level === 1
                            ? comment.comment.id
                            : comment.comment.parent
                    }
                />,
            ]}
            author={
                <>
                    <Link className="mr-2" to={`/u/${comment.author.username}`}>
                        {comment.author.username}
                    </Link>
                    <PostAbout date={comment.comment.createdAt} />
                </>
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
