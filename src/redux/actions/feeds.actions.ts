import { Feed, PostResponse } from "../../api/Feeds"

export const FEED__POST = "FEED__POST"
export const FEED__LOAD = "FEED__LOAD"
export const FEED__CLEAR = "FEED__CLEAR"
export const FEED__CHANGE_SORT = "FEED__CHANGE_SORT"
export const FEED__BUMP_PAGE = "FEED__BUMP_PAGE"

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

/**
 * Load a post into a feed. 
 * 
 * @param post The post's details.
 */
export const loadPost = (post: PostLoad) => ({
    type: FEED__LOAD,
    payload: post,
})

/**
 * When a feed is received.
 * 
 * @param initial The initial feed request.
 */
export const postFeed = (initial: InitialFeed) => ({
    type: FEED__POST,
    payload: initial,
})

/**
 * Clear a feed of it's posts.
 * 
 * @param id The ID of the feed.
 */
export const feedClear = (id: string) => ({
    type: FEED__CLEAR,
    payload: id,
})

/**
 * Change the sort of a feed.
 * 
 * @param sortChange The sort change details.
 */
export const changeSort = (sortChange: SortChange) => ({
    type: FEED__CHANGE_SORT,
    payload: sortChange,
})

/**
 * 
 */
export const bumpPage = (id: string) => ({
    type: FEED__BUMP_PAGE,
    payload: id,
})
