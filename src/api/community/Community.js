import { API } from "../ApiHandler"

/**
 * Get a community by it's name.
 * @param name
 * @param callback
 */
export const getCommunityByName = async name => {
    return await API.get(`/community/name/${name}`)
}

/**
 * Get all communities.
 */
export const getAllCommunities = async () => {
    return await API.get(`/community`)
}

/**
 * Get a community by it's ID.
 * @param id
 * @param callback
 */
export const getCommunityById = async id => {
    return await API.get(`/community/${id}`)
}
