import { API } from "../ApiHandler"

/**
 * Delete a rule.
 *
 * @param id The ID of the community.
 * @param rule The rule to delete.
 */
export const deleteCommunityRule = async (id: number, rule: number) => {
    return await API.delete(`/community/${id}/rules/${rule}`)
}

/**
 * Update a rule's title.
 *
 * @param id The ID of the community.
 * @param rule The ID of the rule.
 * @param title The new title for the rule.
 */
export const updateCommunityRuleTitle = async (
    id: number,
    rule: number,
    title: string
) => {
    let form = new FormData()

    form.append("id", `${rule}`)
    form.append("title", `${title}`)

    return await API.patch(`/community/${id}/rules/title`, form)
}

/**
 * Update a rule's body.
 *
 * @param id The ID of the community.
 * @param rule The ID of the rule.
 * @param title The new body for the rule.
 */
export const updateCommunityRuleBody = async (
    id: number,
    rule: number,
    body: string
) => {
    let form = new FormData()

    form.append("id", `${rule}`)
    form.append("body", `${body}`)

    return await API.patch(`/community/${id}/rules/body`, form)
}
