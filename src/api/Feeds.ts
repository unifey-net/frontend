import { API } from "./ApiHandler"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { FeedState } from "../redux/reducers/feeds.reducer"
import { postFeed } from "../redux/actions/feeds.actions"
import { User } from "./user/User"
import Vote from "./user/Vote"

export type Post = {
    id: number
    createdAt: number
    authorId: number
    feed: string
    title: string
    content: string
    upvotes: number
    downvotes: number
}

export type PostResponse = {
    post: Post
    author: User
    vote: Vote | null
}

export type Feed = {
    id: string
    banned: number[]
    moderators: number[]
    postCount: number
    pageCount: number
}

export const useFeed = (id: string): [FeedState | null, any] => {
    let dispatch = useDispatch()

    let [status, setStatus] = useState({
        status: 0,
        message: "This feed hasn't been loaded yet.",
    })

    let storedFeed = useSelector((state: any) => state.feeds[id])

    useEffect(() => {
        const grabFeed = async () => {
            let resp = await getFeed(id)

            if (resp.status === 200) {
                dispatch(postFeed({ feed: resp.data as Feed }))

                setStatus(prev => ({
                    ...prev,
                    status: 1,
                }))
            } else {
                setStatus(prev => ({
                    ...prev,
                    status: -1,
                    message: resp.data.payload,
                }))
            }
        }

        if (storedFeed === undefined) {
            grabFeed()
        }
    }, [id, dispatch, storedFeed])

    return [storedFeed === undefined ? null : storedFeed, status]
}

export const useEditingStatus = (post: number): boolean => {
    let editor = useSelector((store: any) => store.editor)

    return editor.isEditing && editor.id === post
}

/**
 * Get a feed's posts.
 * @param {string} id
 * @param {string} sort
 * @param {int} page
 */
export const getFeedPosts = async (id: string, sort: string, page: number) => {
    return await API.get(`/feeds/${id}/posts?page=${page}&sort=${sort}`)
}

/**
 * Get a feed.
 * @param {string} id
 */
export const getFeed = async (id: string) => {
    return await API.get(`/feeds/${id}`)
}

/**
 * Post to a feed
 * @param {string} id
 * @param {string} content
 * @param {string} title
 */
export const createPost = async (
    id: string,
    content: string,
    title: string
) => {
    let form = new FormData()

    form.append("content", content)
    form.append("title", title)

    return await API.post(`/feeds/${id}`, form)
}

/**
 * Vote to the post
 *
 * @param {string} id
 * @param {int} type
 */
export const votePost = async (feed: string, id: number, type: number) => {
    let form = new FormData()

    form.append("vote", `${type}`)

    return await API.post(`/feeds/${feed}/post/${id}/vote`, form)
}

export const voteComment = async (
    feed: string,
    id: number,
    type: number,
    comment: number
) => {
    let form = new FormData()

    form.append("vote", `${type}`)

    return await API.post(
        `/feeds/${feed}/post/${id}/comments/${comment}/vote`,
        form
    )
}

/**
 * Get a post.
 * @param {*} id
 */
export const getPost = async (feed: string, id: number) => {
    return await API.get(`/feeds/${feed}/post/${id}`)
}

export const deletePost = async (feed: string, id: number) => {
    return await API.delete(`/feeds/${feed}/post/${id}`)
}

/**
 * drop da roof more expansion :D
 * @param feed
 * @param post
 * @param id
 */
export const deleteComment = async (feed: string, post: number, id: number) => {
    return await API.delete(`/feeds/${feed}/post/${post}/comments/${id}`)
}

/**
 * update a post's content. :D
 * @param {*} id
 */
export const updatePostContent = async (
    feed: string,
    id: number,
    content: string
) => {
    let form = new FormData()

    form.append("content", content)

    return await API.post(`/feeds/${feed}/post/${id}/content`, form)
}

export const updatePostTitle = async (
    feed: string,
    id: number,
    title: string
) => {
    let form = new FormData()

    form.append("title", title)

    return await API.post(`/feeds/${feed}/post/${id}/title`, form)
}

export const updateCommentContent = async (
    feed: string,
    post: number,
    id: number,
    content: string
) => {
    let form = new FormData()

    form.append("content", content)

    return await API.post(
        `/feeds/${feed}/post/${post}/comments/${id}/content`,
        form
    )
}
