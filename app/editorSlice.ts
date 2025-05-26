import { createSlice } from "@reduxjs/toolkit"

const initialState = { text: "" }

/**
 * Slice for managing the text editor state. 
 */
const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setText: (state, action) => {
            state.text = action.payload
        }
    }
})

export const { setText } = editorSlice.actions
export default editorSlice.reducer