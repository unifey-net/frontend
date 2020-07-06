import { THEME_DARK, THEME_LIGHT, THEME_AUTO } from "../actionType";

/**
 * Get the initial state.
 */
const getInitialState = () => {
    let stored = localStorage.getItem("theme")

    if (stored != null && stored !== "" && typeof stored != undefined)
        return JSON.parse(stored);

    return { theme: "dark" };
}

/**
 * Save the state.
 * @param {*} state 
 */
const saveState = (state) => {
    localStorage.setItem("theme", JSON.stringify(state))
}

/**
 * An alert.
 * @param {*} state
 * @param {*} action
 */
const theme = (state = getInitialState(), action) => {
    switch (action.type) {
        case THEME_DARK: {
            state = {
                theme: "dark"
            }

            if (action.payload.stay === true) saveState(state);

            return state;
        }

        case THEME_LIGHT: {
            state = {
                theme: "light"
            }

            if (action.payload.stay === true) saveState(state);

            return state;
        }

        case THEME_AUTO: {
            state = {
                theme: "auto"
            }

            if (action.payload.stay === true) saveState(state)
            
            return state;
        }

        default: 
            return state
    }
};

export default theme;
