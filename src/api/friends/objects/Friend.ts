import { User } from "../../user/User";

/**
 * A friend.
 */
export type Friend = {
    id: number,
    friendedAt: string,
    friendDetails: User
}