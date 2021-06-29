import React from "react"

/**
 * About a post.
 */
const PostAbout: React.FC<{ date: number }> = ({ date }) => {
    return (
        <span className="post-creation-date">
            {new Date(date).toLocaleString()}
        </span>
    )
}

export default PostAbout;