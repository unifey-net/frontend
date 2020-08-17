import { API } from "../ApiHandler";
import store from "../../redux/store";
import { postCommunity } from "../../redux/actions/community.actions";

/**
 * Get a community by it's name in the store.
 * @param {string} name 
 */
const getStoreCommunityByName = (name) => {
    let state = store.getState().community

    for (let i = 0; state.length > i; i++) {
        let community = state[i]

        if (community.data.community.name.toLowerCase() === name.toLowerCase()) {
            return community;
        }
    }

    return null
}

/**
 * Get a community by it's ID in the store.
 * @param {long} id 
 */
const getStoreCommunityById = (id) => {
    let state = store.getState().community

    for (let i = 0; state.length > i; i++) {
        let community = state[i]

        if (community.data.community.id === id) {
            return community
        }
    }

    return null
}

/**
 * Get a community by it's name.
 * @param name
 * @param callback
 */
export const getCommunityByName = async (name) => {
    let state = getStoreCommunityByName(name)
    
    if (state !== null) return state;

    let community = await API.get(`/community/name/${name}`)

    if (community.status !== 200)
        return community

    store.dispatch(postCommunity(community))

    return community;
};

/**
 * Get all communities.
 */
export const getAllCommunities = async () => {
    return await API.get(`/community`);
};

/**
 * Get a community by it's ID.
 * @param id
 * @param callback
 */
export const getCommunityById = async (id) => {
    let state = getStoreCommunityById(id);

    if (state !== null) return state;

    let community = await API.get(`/community/${id}`);

    if (community.status !== 200) return community;

    store.dispatch(postCommunity(community));

    return community;
};

/**
 * Join a community.
 * @param id
 * @param callback
 */
export const joinCommunity = (id, callback) => {
    // TODO
};

/**
 * Leave a community.
 * @param id
 * @param callback
 */
export const leaveCommunity = (id, callback) => {
    // TODO
};

/**
 * Delete a community.
 * @param id
 * @param callback
 */
export const deleteCommunity = (id, callback) => {
    // TODO
};

/**
 * Update a communities' name.
 * @param id
 * @param name
 * @param callback
 */
export const updateCommunityName = (id, name, callback) => {
    // TODO
};

/**
 * Update a communities' desc.
 * @param id
 * @param desc
 * @param callback
 */
export const updateCommunityDesc = (id, desc, callback) => {
    // TODO
};

/**
 * View a user's role in a community.
 * @param id
 * @param userId
 * @param callback
 */
export const getRoleInCommunity = (id, userId, callback) => {
    // TODO
};

/**
 * Set a user's role in a community.
 * @param id
 * @param userId
 * @param newRole
 * @param callback
 */
export const setRoleInCommunity = (id, userId, newRole, callback) => {
    // TODO
};

/**
 * Get self user's role in community.
 * @param id
 * @param callback
 */
export const getSelfRoleInCommunity = (id, callback) => {
    // TODO
};
