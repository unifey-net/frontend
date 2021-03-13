import React from "react"

/**
 * About a post.
 */
const PostAbout: React.FC<{ date: number }> = ({ date }) => {
    return (
        <span className="invisible lg:visible">
            Posted on {new Date(date).toLocaleString()}
        </span>
    )
}

export default PostAbout;