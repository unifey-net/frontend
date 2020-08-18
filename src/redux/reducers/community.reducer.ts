import debug from "../../api/Debug";

const { COMMUNITY__POST } = require("../actions/community.actions");

/**
 * Manages communities.
 * @param {*} state
 * @param {*} action
 */
const community = (state = {} as any, action: any) => {
    switch (action.type) {
        case COMMUNITY__POST: {
            const community = action.payload;

            debug("%o", [community])

            state[community.community.name] = community

            return state;
        }

        default: {
            return state;
        }
    }
};

export default community;