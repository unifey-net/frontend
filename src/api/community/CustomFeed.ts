/**
 * This is for feeds like trending and the personalized one.
 */

import { API } from "../ApiHandler"
import { PostResponse } from "../Feeds"

/**
 * A custom feed.
 */
export type CustomFeed = {
    pageCount: number
    postCount: number
}

/**
 * A custom feed response.
 */
export type CustomFeedResponse = {
    posts: PostResponse[]
    feed: CustomFeed
}

/**
 * Get a custom feed.
 *
 * @param url Something like /feeds/self.
 */
export const getCustomFeed = async (
    url: string,
    sort: string,
    page: number
) => {
    return API.get(`${url}?page=${page}&sort=${sort}`)
}
