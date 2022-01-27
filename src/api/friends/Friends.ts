import { useSelector } from "react-redux"
import store from "../../redux/store"
import { Friend } from "./objects/Friend"
import { useAppSelector } from "../../util/Redux"

/**
 * Get a friend by their ID.
 *
 * @param id The ID of the friend.
 */
export const useFriend = (id: number) => {
    const friends = useAppSelector((state) => state.friends.friends)
    const filter = friends.filter((fr: Friend) => fr.id === id)

    if (filter.length > 0) return filter[0]
    else return null
}
