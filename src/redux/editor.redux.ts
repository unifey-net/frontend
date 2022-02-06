import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type EditorState = {
    isEditing: boolean
    id?: number
    type?: string
}

export const editorSlice = createSlice({
    name: "editor",
    initialState: { isEditing: false } as EditorState,
    reducers: {
        /**
         * Start editing on a:
         * - community
         * - post
         * - comment
         */
        startEditing: (state, action: PayloadAction<{ id: number, type: "community" | "comment" | "post" }>) => {
            state.isEditing = true
            state.id = action.payload.id
            state.type = action.payload.type
        },
        /**
         * Stop editing
         */
        stopEditing: (state) => {
            state.isEditing = true
            state.id = undefined
            state.type = undefined
        }
    }
})

export const { stopEditing, startEditing } = editorSlice.actions
