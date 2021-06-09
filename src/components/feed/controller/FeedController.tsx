import React from "react"
import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { API } from "../../../api/ApiHandler"
import { getFeedPosts, useFeed } from "../../../api/Feeds"
import {
    bumpPage,
    changeSort,
    feedClear,
    loadPost,
} from "../../../redux/actions/feeds.actions"
import community from "../../../redux/reducers/community.reducer"
import FeedSkeleton from "../FeedSkeleton"
import PostBox from "../PostBox"
import useSortChanger from "../SortChanger"

const FeedController: React.FC<{ id: string; usePostbox: boolean }> = ({ id, usePostbox }) => {
    console.log(`${id} using PostBox: ${usePostbox}`)
    let dispatch = useDispatch()

    let [feed, status] = useFeed(id)

    const [sort, button] = useSortChanger("NEW", sort => {
        dispatch(changeSort({ sort, id }))
        dispatch(feedClear(id))
    })

    /**
    //  * Handle sorting.
    //  */
    useEffect(() => {
        let querySort = new URL(window.location.toString()).searchParams.get(
            "sort"
        )

        if (
            (querySort === "NEW" ||
                querySort === "OLD" ||
                querySort === "TOP") &&
            querySort !== sort
        ) {
            dispatch(
                changeSort({
                    sort: querySort.toLowerCase(),
                    id,
                })
            )
        }
    }, [dispatch, id, sort])

    /**
     * Load another post.
     */
    const loadMore = useCallback(async () => {
        let pageCount =
            feed?.feed.pageCount !== undefined ? feed?.feed.pageCount : 0
        let currentPage = feed?.page !== undefined ? feed?.page : 0

        if (pageCount === 0 || currentPage === 0 || currentPage > pageCount)
            return

        let resp = await API.get(`/feeds/${id}/posts?page=${feed!!.page}&sort=${sort}`)
        dispatch(bumpPage(id))

        switch (resp.status) {
            case 200: {
                let posts = resp.data.posts

                dispatch(
                    loadPost({
                        posts,
                        sort,
                        id,
                    })
                )

                break
            }

            case 401: {
                // TODO

                break
            }

            default: {
                break
            }
        }
    }, [dispatch, feed, id, sort])

    useEffect(() => {
        // if feed grab is successful, start init load
        if (status.status === 1) {
            loadMore()
        }
    }, [status, loadMore])

    const onReload = () => dispatch(feedClear(id))

    return (
        <FeedSkeleton
            loadMore={loadMore}
            posts={feed?.posts === undefined ? [] : feed?.posts!!}
            hasMore={() => feed?.feed.pageCount!! > feed?.page!!}
            onReload={onReload}
            changeSort={button}
            postBox={
                usePostbox ? <PostBox
                    feed={id}
                    action={() => {
                        dispatch(feedClear(id))
                        loadMore()
                    }}
                /> : <></>
            }
        />
    )
}

export default FeedController
