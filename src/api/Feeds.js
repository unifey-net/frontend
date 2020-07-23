import { API } from "./ApiHandler";

/**
 * Get a feed's posts.
 * @param {string} id 
 * @param {string} sort 
 * @param {int} page 
 */
export const getFeedPosts = async (id, sort, page) => {
    return await API.get(`/feeds/${id}/posts?page=${page}&sort=${sort}`);
};

/**
 * Get a feed.
 * @param {string} id 
 */
export const getFeed = async (id) => {
    return await API.get(`/feeds/${id}`);
};

/**
 * Post to a feed
 * @param {string} id 
 * @param {string} content 
 * @param {string} title 
 */
export const postFeed = async (id, content, title) => {
    let form = new FormData();

    form.append("content", content)
    form.append("title", title)

    return await API.post(`/feeds/${id}`, form);
};

/**
 * Vote to the post
 * 
 * @param {string} id 
 * @param {int} type 
 */
export const votePost = async (feed, id, type) => {
    let form = new FormData()

    form.append("vote", type)

    return await API.post(`/feeds/${feed}/post/${id}/vote`, form)
}

export const voteComment = async (feed, id, type, comment) => {

}

/**
 * Get a post.
 * @param {*} id 
 */
export const getPost = async (feed, id) => {
    return await API.get(`/feeds/${feed}/post/${id}`)
}