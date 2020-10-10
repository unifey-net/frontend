/**
 * Get a role's name by it's number.
 *
 * @param role The role's number.
 */
export const getRoleName = (role: number) => {
    switch (role) {
        case 0: {
            return "Default"
        }

        case 1: {
            return "Member"
        }

        case 2: {
            return "Moderator"
        }

        case 3: {
            return "Administrator"
        }

        case 4: {
            return "Owner"
        }
    }
}

/**
 * A role assigned to a user.
 */
export type UserRole = {
    user: number
    role: number
}
