import { EMOTES__POST } from "../actions/emotes.actions";

/**
 * Manages emotes.
 * 
 * @param {*} state
 * @param {*} action
 */
const emotes = (state = [], action) => {
    switch (action.type) {
        case EMOTES__POST: {
            const { emotes } = action.payload;

            state = [...state, ...emotes];

            return state;
        }

        default: {
            return state;
        }
    }
};

export default emotes;
