import React, { useCallback, useEffect, useState } from "react"
import PostJsx from "../post/Post"
import { Spin, Alert, Empty } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { PostResponse } from "../../../api/Feeds"
import LinkButton from "../../LinkButton"
import useSortChanger from "../SortChanger"
import InfiniteScroll from "react-infinite-scroll-component"
import {
    CustomFeedResponse,
    getCustomFeed,
} from "../../../api/community/CustomFeed"
import Status, { COMPLETE, ERROR, LOADING } from "../../../api/util/Status"
import FeedSkeleton from "../FeedSkeleton"

type Props = {
    url: string
    focus?: number
}

const CustomFeed: React.FC<Props> = ({ focus, url }) => {
    const [status, setStatus] = useState({ status: LOADING } as Status)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(-1)
    const [posts, setPosts] = useState([] as PostResponse[])

    const [sort, changeSort] = useSortChanger("NEW", sort => {
        setPosts([])
        setPage(1)
        loadMore()
    })

    /**
     * Load another post.
     */
    const loadMore = useCallback(async () => {
        if (maxPage === 0 || (maxPage !== -1 && page > maxPage)) return

        const feed = await getCustomFeed(url, sort, page)

        if (feed.status === 200) {
            setStatus({ status: COMPLETE })
            const feedObj = feed.data as CustomFeedResponse

            setMaxPage(feedObj.feed.pageCount)
            setPosts(posts => [...posts, ...feedObj.posts])
            setPage(page => page + 1)
        } else {
            setStatus({ status: ERROR, message: feed.data.payload })
        }
    }, [maxPage, page, sort, url])

    // init load
    useEffect(() => {
        loadMore()
    }, [loadMore])

    if (status.status === LOADING) {
        return <Spin indicator={<LoadingOutlined/>} />
    }

    return (
        <FeedSkeleton
            loadMore={loadMore}
            hasMore={() => maxPage > page}
            onReload={() => {}}
            currentSort={sort}
            changeSort={changeSort}
            posts={posts}
        />
    )
}

export default CustomFeed
