import {
    FEED__LOAD,
    FEED__POST,
    InitialFeed,
    PostLoad,
    FEED__CLEAR,
    FEED__CHANGE_SORT,
    SortChange,
    FEED__BUMP_PAGE,
} from "../actions/feeds.actions"
import { Feed, PostResponse } from "../../api/Feeds"

export type FeedState = {
    feed: Feed
    posts: PostResponse[]
    sort: string
    page: number
}

/**
 * Manages communities.
 * @param {*} state
 * @param {*} action
 */
const feeds = (state = {} as any, action: any) => {
    switch (action.type) {
        case FEED__LOAD: {
            let { id, posts, sort } = action.payload as PostLoad

            let currentObj = state[id]

            state[id] = {
                ...currentObj,
                sort: sort,
                posts: [...posts],
            }

            return state
        }

        case FEED__POST: {
            let { feed } = action.payload as InitialFeed

            state[feed.id] = {
                feed: feed,
                posts: [],
                page: 1,
            }

            return state
        }

        case FEED__CLEAR: {
            let id = action.payload

            state[id] = {
                ...state[id],
                posts: [],
                page: 1,
            }

            return state
        }

        case FEED__CHANGE_SORT: {
            let { id, sort } = action.payload as SortChange

            state[id] = {
                ...state[id],
                sort,
            }

            return state
        }

        case FEED__BUMP_PAGE: {
            let id = action.payload

            state[id] = {
                ...state[id],
                page: state[id].page + 1,
            }

            return state
        }

        default: {
            return state
        }
    }
}

export default feeds
