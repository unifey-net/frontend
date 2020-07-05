import React from "react"
import Feed from "../components/feed/Feed"
import InfiniteScroll from "react-infinite-scroller"

export default function Trending() {
    return (
        <div className="info-container">
            <Feed id="trending" />
        </div>
    );
}