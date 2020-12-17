type Comment = {
    parent: number
    post: number
    level: number
    id: number
    createdAt: number
    authorId: number
    feed: string
    content: string
    upvotes: number
    downvotes: number
}

export default Comment
