import React from "react"
import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { API } from "../../../api/ApiHandler"
import { bumpPage, changeSort, clearFeed, loadFeed, useFeed } from "../../../api/Feeds"
import FeedSkeleton from "../FeedSkeleton"
import useSortChanger from "../SortChanger"
import useCreatePost from "../useCreatePost"

const FeedController: React.FC<{ id: string; usePostbox: boolean }> = ({ id, usePostbox }) => {
    let dispatch = useDispatch()

    let [feed, status] = useFeed(id)

    const [sort, button] = useSortChanger("NEW", sort => {
        console.debug(`Feed (${id}): Sort has changed to ${sort}`)

        dispatch(changeSort({ sort, id }))
        dispatch(clearFeed({ id }))
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

        console.debug(
            `Feed (${id}): Requesting page NO.${feed!!.page} with sort ${sort}`
        )

        let resp = await API.get(`/feeds/${id}/posts?page=${feed!!.page}&sort=${sort}`)
        dispatch(bumpPage({ id }))

        switch (resp.status) {
            case 200: {
                let posts = resp.data.posts

                dispatch(
                    loadFeed({
                        post: {
                            posts,
                            sort,
                            id,
                        }
                    })
                )

                break
            }

            case 401: {
                console.error(`Feed (${id}): Error 401`)

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

    const [modal, createPost] = useCreatePost(feed?.feed.id!!, () => {
        dispatch(clearFeed({ id }))
        loadMore()
    })

    const onReload = () => dispatch(clearFeed({ id }))

    return (
        <>
            {usePostbox ? modal : <></>}

            <FeedSkeleton
                loadMore={loadMore}
                posts={feed?.posts === undefined ? [] : feed?.posts!!}
                hasMore={() => feed?.feed.pageCount!! > feed?.page!!}
                onReload={onReload}
                changeSort={button}
                createPost={usePostbox ? createPost : undefined}
                currentSort={sort}
            />
        </>
    )
}

export default FeedController
