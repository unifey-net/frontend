import { API } from "./ApiHandler"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { User } from "./user/User"
import Vote from "./user/Vote"
import Status, { COMPLETE, ERROR, LOADING } from "./util/Status"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "../util/Redux"

export const postSlice = createSlice({
    name: "post",
    initialState: -1,
    reducers: {
        setPost: (state, action: PayloadAction<{ post: number }>) =>
            action.payload.post,
    },
})

/**
 * When a post is loaded in an infinite feed.
 */
export type PostLoad = {
    posts: PostResponse[]
    sort: string
    id: string
}

/**
 * An initial feed import.
 */
export type InitialFeed = {
    feed: Feed
}

/**
 * The details for a sort change.
 */
export type SortChange = {
    sort: string
    id: string
}

export type FeedState = {
    feed: Feed
    posts: PostResponse[]
    sort: string
    page: number
}

export const feedSlice = createSlice({
    name: "feed",
    initialState: {} as any,
    reducers: {
        loadFeed: (state, action: PayloadAction<{ post: PostLoad }>) => {
            const { id, posts, sort } = action.payload.post

            state[id] = {
                ...state[id],
                sort,
                posts,
            } as FeedState
        },
        postFeed: (state, action: PayloadAction<{ feed: InitialFeed }>) => {
            const { feed } = action.payload.feed

            state[feed.id] = {
                feed,
                posts: [],
                page: 1,
            }
        },
        clearFeed: (state, action: PayloadAction<{ id: string }>) => {
            state[action.payload.id] = {
                ...state[action.payload.id],
                posts: [],
                page: 1,
            }
        },
        changeSort: (
            state,
            action: PayloadAction<{ id: string; sort: string }>
        ) => {
            const { id, sort } = action.payload

            state[id] = {
                ...state[id],
                sort,
            }
        },
        bumpPage: (state, action: PayloadAction<{ id: string }>) => {
            const id = action.payload.id
            state[id] = {
                ...state[id],
                page: state[id].page + 1,
            }
        },
    },
})

export const { bumpPage, changeSort, clearFeed, postFeed, loadFeed } =
    feedSlice.actions

/**
 * A post.
 */
export type Post = {
    id: number
    createdAt: number
    authorId: number
    feed: string
    title: string
    content: string
    upVotes: number
    downVotes: number
}

/**
 * The response when grabbing a post from the api.
 */
export type PostResponse = {
    post: Post
    author: User
    vote: Vote | null
}

/**
 * A feed.
 */
export type Feed = {
    id: string
    banned: number[]
    moderators: number[]
    postCount: number
    pageCount: number
}

/**
 * Grab a feed from the API then store it in Redux.
 *
 * @param id The ID of the feed.
 * @returns The state of the feed and status.
 */
export const useFeed = (id: string): [FeedState | null, any] => {
    let dispatch = useDispatch()

    let [status, setStatus] = useState({
        status: LOADING,
    } as Status)

    let storedFeed = useAppSelector(state => state.feeds[id])

    useEffect(() => {
        const grabFeed = async () => {
            let resp = await getFeed(id)

            if (resp.status === 200) {
                dispatch(
                    postFeed({
                        feed: {
                            feed: resp.data as Feed,
                        },
                    })
                )

                setStatus({
                    status: COMPLETE,
                })
            } else {
                setStatus({
                    status: ERROR,
                    message: resp.data.payload,
                })
            }
        }

        if (storedFeed === undefined) {
            grabFeed()
        } else {
            setStatus({ status: COMPLETE }) // already loaded in redux
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
 * Get the self feed.
 */
export const getSelfFeed = async () => {
    return await API.get(`/feeds/self`)
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

/**
 * Update a post's title.
 *
 * @param feed The feed where the post resides.
 * @param id The ID of the post.
 * @param title The new title for the post.
 */
export const updatePostTitle = async (
    feed: string,
    id: number,
    title: string
) => {
    let form = new FormData()

    form.append("title", title)

    return await API.post(`/feeds/${feed}/post/${id}/title`, form)
}

/**
 * Update a comment's content.
 *
 * @param feed The feed where the post resides.
 * @param post The post where the comment resides.
 * @param id The comment's ID.
 * @param content The new content for the comment.
 */
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

/**
 * Create a comment.
 *
 * @param feed The feed where the post resides.
 * @param post The post to reply to.
 * @param content The content of the reply.
 * @param level The level of the comment. This dictates the URL.
 */
export const createComment = async (
    feed: string,
    post: number,
    content: string,
    level: any
) => {
    let form = new FormData()

    form.append("content", content)

    switch (level.level) {
        case 1: {
            return await API.put(
                `/feeds/${feed}/post/${post}/comments/${level.id}`,
                form
            )
        }

        default: {
            // case 0
            return await API.put(`/feeds/${feed}/post/${post}/comments`, form)
        }
    }
}
