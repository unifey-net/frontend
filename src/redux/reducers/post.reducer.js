import { POST__SET } from "../actions/post.actions";

/**
 * Manages the current post.
 *
 * @param {*} state
 * @param {*} action
 */
const post = (state = -1, action) => {
    switch (action.type) {
        case POST__SET: {
            const { post } = action.payload;

            state = post

            return state;
        }

        default: {
            return state;
        }
    }
};

export default post;
