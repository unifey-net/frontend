import { EDITOR__START, EDITOR__STOP } from "../actions/editor.actions";

type EditorState = {
    isEditing: boolean
    id?: number
    type?: string
}

/**
 * Manages current editor state
 * @param {*} state
 * @param {*} action
 */
const editor = (state: EditorState = { isEditing: false }, action: any) => {
    switch (action.type) {
        case EDITOR__START: {
            const { id, type } = action.payload

            state = {
                isEditing: true,
                id,
                type
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
