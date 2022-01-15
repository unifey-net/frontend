import { useSelector } from "react-redux"
import store from "../../redux/store"
import { Friend } from "./objects/Friend"

/**
 * Get a friend by their ID.
 * 
 * @param id The ID of the friend.
 */
export const useFriend = (id: number) => {
    const friends = useSelector(store.friends.friends) as Friend[]
    const filter = friends.filter((fr: Friend) => fr.id === id)

    if (filter.length > 0) return filter[0]
    else return null
}