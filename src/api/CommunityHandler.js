import {BASE_URL} from "./ApiHandler";
import {getToken} from "./AuthenticationManager";

/**
 * Get a community by it's name.
 * @param name
 * @param callback
 */
export const getCommunityByName = async (name) => {
    return await fetch(`${BASE_URL}/community/name/${name}`)
        .then((resp) => resp.json())
}

export const getAllCommunities = async () => {
    return await fetch(`${BASE_URL}/community`)
        .then(resp => resp.json())
}

/**
 * Get a community by it's ID.
 * @param id
 * @param callback
 */
export const getCommunityById = (id, callback) => {
    fetch(`${BASE_URL}/community/${id}`)
        .then((resp) => {
            if (resp.ok) {
                resp.json()
                    .then((json) => callback(json))
            } else callback(null)
        })
        .catch(() => callback(null))
}

/**
 * Get a list of communities
 * @param start
 * @param limit
 * @param callback
 */
export const getCommunities = (start, limit, callback) => {
    fetch(`${BASE_URL}/community?start=${start}&limit=${limit}`)
        .then((resp) => {
            if (resp.ok) {
                resp.json()
                    .then((json) => callback(json))
            } else callback(null)
        })
        .catch(() => callback(null))
}

/**
 * Join a community.
 * @param id
 * @param callback
 */
export const joinCommunity = (id, callback) => {
    // TODO
}

/**
 * Leave a community.
 * @param id
 * @param callback
 */
export const leaveCommunity = (id, callback) => {
    // TODO
}

/**
 * Delete a community.
 * @param id
 * @param callback
 */
export const deleteCommunity = (id, callback) => {
    // TODO
}

/**
 * Update a communities' name.
 * @param id
 * @param name
 * @param callback
 */
export const updateCommunityName = (id, name, callback) => {
    // TODO
}

/**
 * Update a communities' desc.
 * @param id
 * @param desc
 * @param callback
 */
export const updateCommunityDesc = (id, desc, callback) => {
    // TODO
}

/**
 * View a user's role in a community.
 * @param id
 * @param userId
 * @param callback
 */
export const getRoleInCommunity = (id, userId, callback) => {
    // TODO
}

/**
 * Set a user's role in a community.
 * @param id
 * @param userId
 * @param newRole
 * @param callback
 */
export const setRoleInCommunity = (id, userId, newRole, callback) => {
    // TODO
}

/**
 * Get self user's role in community.
 * @param id
 * @param callback
 */
export const getSelfRoleInCommunity = (id, callback) => {
    // TODO
}
