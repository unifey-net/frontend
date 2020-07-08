const { COMMUNITY__POST } = require("../actions/community.actions");

/**
 * Manages communities.
 * @param {*} state
 * @param {*} action
 */
const community = (state = [], action) => {
    switch (action.type) {
        case COMMUNITY__POST: {
            const { community } = action.payload;

            state.push(community)

            return state;
        }

        default: {
            return state;
        }
    }
};

export default community;