export const EDITOR__START = "EDITOR__START"
export const EDITOR__STOP = "EDITOR__STOP"

const startEditing = (
    id: number,
    type: "community" | "comment" | "post"
): any => ({
    type: EDITOR__START,
    payload: { id, type },
})

const stopEditing = () => ({
    type: EDITOR__STOP,
    payload: {},
})

export { stopEditing, startEditing }
