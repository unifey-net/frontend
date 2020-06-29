const { CLEAR, INFO, WARNING, ERROR, SUCCESS } = require("../actionType");

/**
 * An alert.
 * @param {*} state
 * @param {*} action
 */
const alert = (state = {}, action) => {
    switch (action.type) {
        case CLEAR:
            state = {}
            return state;
        
        case INFO:
            state = {
                message: action.payload.message,
                type: "info"
            }

            return state;

        case WARNING:
            state = {
                message: action.payload.message,
                type: "warning"
            }

            return state;

        case ERROR:
            state = {
                message: action.payload.message,
                type: "ERROR"
            }

            return state;
            
        case SUCCESS:
            state = {
                message: action.payload.message,
                type: "SUCCESS"
            }

            return state;

        default: {
            return state;
        }
    }
};

export default alert;
