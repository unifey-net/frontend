import { Post, Comment } from "../../api/Feeds";

export const EDITOR__START = "EDITOR__START";
export const EDITOR__STOP = "EDITOR__STOP"

const startEditing = (object: Comment | Post): any => ({
    type: EDITOR__START,
    payload: { object }
})

const stopEditing = () => ({
    type: EDITOR__STOP,
    payload: {}
})

export { stopEditing, startEditing }