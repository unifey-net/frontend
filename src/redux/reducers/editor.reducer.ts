import { EDITOR__START, EDITOR__STOP } from "../actions/editor.actions";
import { Post, Comment } from "../../api/Feeds";

type EditorState = {
    isEditing: boolean,
    object?: Post | Comment
}

/**
 * Manages current editor state
 * @param {*} state
 * @param {*} action
 */
const editor = (state: EditorState = { isEditing: false }, action: any) => {
    switch (action.type) {
        case EDITOR__START: {
            let { object } = action.payload

            state = {
                isEditing: true,
                object
            }

            return state
        }

        case EDITOR__STOP: {
            state = { isEditing: false }

            return state
        }

        default: {
            return state;
        }
    }
};

export default editor;
