import React, { useState, useEffect } from "react"
import PostComment from "./PostComment"
import { API } from "../../../../api/ApiHandler"
import { Spin, Button } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

type Props = {
    id: number
    feed: string
    sort?: "NEW" | "TOP" | "OLD"
    data?: any
    comment?: number
}

const PostComments: React.FC<Props> = ({ id, feed, data, comment, sort }) => {
    const [initialSort, setInitialSort] = useState(
        (sort ? sort : "NEW") as "NEW" | "TOP" | "OLD"
    )
    const [comments, setComments] = useState([] as any[])
    const [loaded, setLoaded] = useState(false)

    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)
    const [commentSize, setCommentSize] = useState(0) // the amount of comments the post has

    // eslint-disable-next-line
    const loadMore = async (maxPg: number, pg: number) => {
        if (maxPg !== 0 && pg > maxPage) return

        let url =
            typeof comment == undefined
                ? `/feeds/${feed}/post/${id}/comments/${comment}?page=${pg}`
                : `/feeds/${feed}/post/${id}/comments?page=${pg}&sort=${
                      sort ? sort : "NEW"
                  }`

        let req = await API.get(url)

        if (req.status === 200) {
            const { pages, amount, comments } = req.data

            if (pages !== 0) {
                setPage(prev => prev + 1)
                setMaxPage(pages)
                setCommentSize(amount)
                setComments(prev => [...prev, ...comments])
            } else {
                setMaxPage(0)
            }
        }

        setLoaded(true)
    }

    useEffect(() => {
        if (data == null) {
            loadMore(0, 1)
        } else {
            const { pages, amount, comments } = data

            setPage(1)

            setMaxPage(pages)
            setCommentSize(amount)
            setComments(comments)

            setLoaded(true)
        }
        // eslint-disable-next-line
    }, [data])

    useEffect(() => {
        if (sort !== initialSort && sort) {
            console.log("updating sort")
            setInitialSort(sort)

            setPage(1)
            setMaxPage(0)
            setCommentSize(0)
            setComments([])

            setLoaded(false)
            loadMore(0, 1)
        }
    }, [sort, initialSort, loadMore])

    return (
        <>
            {!loaded && <Spin indicator={<LoadingOutlined />} />}

            {loaded && (
                <>
                    {comments.map((comment, index) => (
                        <PostComment key={index} comment={comment}>
                            {comment.comment.level === 1 && ( // level 1 comments are comments directly onto the post. level 2 is comments on comments, which is the limit.
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
                        <Button
                            type="link"
                            onClick={() => loadMore(maxPage, page + 1)}
                        >
                            {commentSize - comments.length} more
                        </Button>
                    )}
                </>
            )}
        </>
    )
}

export default PostComments
