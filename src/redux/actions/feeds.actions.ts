import { Feed, PostResponse } from "../../api/Feeds"

export const FEED__POST = "FEED__POST"
export const FEED__LOAD = "FEED__LOAD"
export const FEED__CLEAR = "FEED__CLEAR"
export const FEED__CHANGE_SORT = "FEED__CHANGE_SORT"
export const FEED__BUMP_PAGE = "FEED__BUMP_PAGE"

export type PostLoad = {
    posts: PostResponse[]
    sort: string
    id: string
}

export type InitialFeed = {
    feed: Feed
}

export type SortChange = {
    sort: string
    id: string
}

export const loadPost = (post: PostLoad) => ({
    type: FEED__LOAD,
    payload: post,
})

export const postFeed = (initial: InitialFeed) => ({
    type: FEED__POST,
    payload: initial,
})

export const feedClear = (id: string) => ({
    type: FEED__CLEAR,
    payload: id,
})

export const changeSort = (sortChange: SortChange) => ({
    type: FEED__CHANGE_SORT,
    payload: sortChange,
})

export const bumpPage = (id: string) => ({
    type: FEED__BUMP_PAGE,
    payload: id,
})
