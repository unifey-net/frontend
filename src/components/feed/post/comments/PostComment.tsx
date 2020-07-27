import React, { useState } from "react";
import { Avatar, Comment, Button, message } from "antd";
import { AccountBookOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../../api/user/User";
import PostVote from "../PostVote";
import PostReply from "../PostReply";
import { useSelector, useDispatch } from "react-redux";
import PostAbout from "../PostAbout";
import PostManagement from "../PostManagement";
import { useEditingStatus, updateCommentContent } from "../../../../api/Feeds";
import TextArea, { HTMLTextareaProps } from "antd/lib/input/TextArea";
import { stopEditing } from "../../../../redux/actions/editor.actions";

type Props = {
    comment: any;
    children: any;
};

export default ({ comment, children }: Props): JSX.Element => {
    const [content, setContent] = useState(comment.comment.content)
    const post = useSelector((state: any) => state.post);
    const dispatch = useDispatch()

    const editing = useEditingStatus(comment.comment.id);

    const updateContent = async () => {
        dispatch(stopEditing())

        let element = document.getElementById(`${comment.comment.id}_content`) as HTMLTextAreaElement;
        let value = element.value

        if (content === value || value === "") {
            return;
        }

        let request = await updateCommentContent(comment.comment.feed, post, comment.comment.id, value)

        if (request.status !== 200) {
            message.error(request.data.payload)
            return
        }

        message.success("Comment has been successfully updated!")

        setContent(value)
    }

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
                <PostManagement type="comment" object={comment.comment} />,
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
                <>
                    {!editing && (
                        <p
                            dangerouslySetInnerHTML={{
                                __html: content
                            }}
                        />
                    )}

                    {editing && (
                        <>
                            <TextArea
                                id={`${comment.comment.id}_content`}
                                defaultValue={comment.comment.content}
                                style={{
                                    marginBottom: ".5rem"
                                }}
                            />
                            <Button onClick={() => updateContent()}>Done</Button>
                        </>
                    )}
                </>
            }
        >
            {children}
        </Comment>
    );
};
