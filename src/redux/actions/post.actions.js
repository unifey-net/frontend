export const POST__SET = "POST__SET"

/**
 * Set the current post.
 */
export const updatePost = post => ({
    type: POST__SET,
    payload: { post },
})
