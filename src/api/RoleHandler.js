/**
 * Get a role name by it's ID
 * @param role
 * @returns {string}
 */
export const getRoleName = (role) => {
    switch (role) {
        case 1:
            return "Moderator"
        case 2:
            return "Administrator"

        default:
            return ""
    }
}
