import { API } from "../ApiHandler"

/**
 * Get a community by it's name.
 * @param name
 * @param callback
 */
export const getCommunityByName = async (name: string) => {
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
export const getCommunityById = async (id: number) => {
    return await API.get(`/community/${id}`)
}

/**
 * Change a communities description.
 *
 * @param desc The new community string.
 * @param id  The communities id.
 */
export const updateCommunityDescription = async (desc: string, id: number) => {
    let form = new FormData()

    form.append("description", desc === undefined ? "" : desc)

    let request = await API.put(`/community/${id}/description`, form)

    return request
}

/**
 * Change a communities permission role.
 *
 * @param id The communities ID.
 * @param role The permission level.
 * @param type post/comment etc
 * @returns
 */
export const updateCommunityPermissionRole = async (
    id: number,
    role: number,
    type: string
) => {
    let form = new FormData()

    form.append("role", `${role}`)

    let request = await API.put(`/community/${id}/roles/${type}`, form)

    return request
}

/**
 * Update a user's role in a community.
 *
 * @param id The community.
 * @param user The user to update the role for.
 * @param role The user's new role.
 */
export const updateUserRole = async (
    id: number,
    user: number,
    role: number
) => {
    let formData = new FormData()

    formData.append("target", `${user}`)
    formData.append("role", `${role}`)

    return await API.post(`/community/${id}/roles`, formData)
}

/**
 * Get a communities roles.
 *
 * @param id The community
 */
export const getRoles = async (id: number) => {
    return await API.get(`/community/${id}/roles`)
}
