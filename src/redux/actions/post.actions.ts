export const POST__SET = "POST__SET"

/**
 * Set the current focused post.
 */
export const updatePost = (post: number) => ({
    type: POST__SET,
    payload: { post },
})
