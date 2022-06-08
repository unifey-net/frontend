import { Member, Profile, User } from "../../api/user/User"

export type UserResponse = {
    user: User
    member: Member
    profile: Profile
}
