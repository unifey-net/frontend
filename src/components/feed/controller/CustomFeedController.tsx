import React, { useEffect, useState } from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { PostResponse } from "../../../api/Feeds"
import useSortChanger from "../SortChanger"
import {
    CustomFeedResponse,
    getCustomFeed,
} from "../../../api/community/CustomFeed"
import Status, { COMPLETE, ERROR, LOADING } from "../../../api/util/Status"
import FeedSkeleton from "../FeedSkeleton"
import History from "../../../api/History"
import { API } from "../../../api/ApiHandler"
import toast from "react-hot-toast"
import { CommunityRequest } from "../../../api/community/CommunityUtil"

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
        console.debug(`Feed (SELF): Sort has changed to ${sort}`)

        setPosts([])
        setPage(1)

        loadMore(true)
    })

    /**
     * Load another post.
     */
    const loadMore = async (sortChanged: boolean = false) => {
        if ((maxPage === 0 || (maxPage !== -1 && page > maxPage)) && !sortChanged) return

        let requestingPage = sortChanged ? 1 : page

        console.debug(
            `Feed (SELF): Requesting page NO.${requestingPage} with sort ${sort} (${url})`
        )

        const feed = await getCustomFeed(url, sort, requestingPage)

        if (feed.status === 200) {
            setStatus({ status: COMPLETE })
            const feedObj = feed.data as CustomFeedResponse

            setMaxPage(feedObj.feed.pageCount)
            setPosts(posts => [...posts, ...feedObj.posts])
            setPage(page => page + 1)
        } else {
            setStatus({ status: ERROR, message: feed.data.payload })
        }
    }

    // init load
    useEffect(() => {
        loadMore()
        // eslint-disable-next-line
    }, [])

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
            focusChange={async (post) => {
                // focusing on community post requires more effort 
                if (post.post.feed.startsWith("cf_")) {
                    let response = await API.get(`/community/${post.post.feed.replace("cf_", "")}`)
                    
                    if (response.status !== 200) {
                        toast.error("There was an issue focusing on that post!")
                    } else {
                        const community = response.data as CommunityRequest

                        History.push(`/c/${community.community.name}/${post.post.id}`)
                    }
                } else {
                    History.push(`/u/${post.author.username}/${post.post.id}`)   
                }
            }}
        />
    )
}

export default CustomFeed
