export const EDITOR__START = "EDITOR__START"
export const EDITOR__STOP = "EDITOR__STOP"

/**
 * Start editing an object.
 * 
 * @param id The ID of the edited object.
 * @param type The type of edited object.
 */
export const startEditing = (
    id: number,
    type: "community" | "comment" | "post"
): any => ({
    type: EDITOR__START,
    payload: { id, type },
})

/**
 * Stop editing an object.
 */
export const stopEditing = () => ({
    type: EDITOR__STOP,
    payload: {},
})
