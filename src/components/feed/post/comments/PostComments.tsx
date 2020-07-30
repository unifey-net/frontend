import React, { useState, useEffect } from "react";
import PostComment from "./PostComment";
import { API } from "../../../../api/ApiHandler";
import { Spin, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type Props = {
    id: number,
    feed: string,
    data?: any,
    comment?: number
}

export default function PostComments({ id, feed, data, comment }: Props): JSX.Element {
    const [comments, setComments] = useState([] as any[]);
    const [loaded, setLoaded] = useState(false);

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [commentSize, setCommentSize] = useState(0); // the amount of comments the post has

    const loadMore = async () => {
        if (maxPage != 0 && page > maxPage) return;

        let url =
            typeof comment == undefined
                ? `/feeds/${feed}/post/${id}/comments/${comment}?page=${page}`
                : `/feeds/${feed}/post/${id}/comments?page=${page}`;
        
        let req = await API.get(url)

        if (req.status === 200) {
            const { pages, amount, comments } = req.data;

            setPage((prev) => prev + 1);
            setMaxPage(pages);
            setCommentSize(amount);
            setComments((prev) => [...prev, ...comments]);
        }

        setLoaded(true);
    };

    useEffect(() => {
        if (data == null) {
            loadMore();
        } else {
            const { pages, amount, comments } = data;

            setPage(1);

            setMaxPage(pages);
            setCommentSize(amount);
            setComments(comments);

            setLoaded(true);
        }
    }, [id]);

    return (
        <>
            {!loaded && <Spin indicator={<LoadingOutlined />} />}

            {loaded && (
                <>
                    {comments.map((comment, index) => (
                        <PostComment key={index} comment={comment}>
                            {comment.comment.level == 1 && ( // level 1 comments are comments directly onto the post. level 2 is comments on comments, which is the limit.
                                <PostComments
                                    feed={feed}
                                    id={id}
                                    comment={comment.comment.id}
                                    data={comment.comments}
                                />
                            )}
                        </PostComment>
                    ))}

                    {commentSize > comments.length && (
                        <Button type="link" onClick={loadMore}>
                            {commentSize - comments.length} more
                        </Button>
                    )}
                </>
            )}
        </>
    );
}