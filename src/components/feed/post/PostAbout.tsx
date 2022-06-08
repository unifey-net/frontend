import React from "react"

const DAY = 1000 * 60 * 60 * 24

const properDate = (time: number): string => {
    const current = Date.now()
    const timeDate = new Date(time)

    if (current - time >= DAY) return timeDate.toLocaleDateString()
    else return timeDate.toLocaleTimeString()
}

/**
 * About a post.
 */
const PostAbout: React.FC<{ date: number }> = ({ date }) => {
    return <span className="post-creation-date">{properDate(date)}</span>
}

export default PostAbout
