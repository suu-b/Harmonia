import {configureStore} from "@reduxjs/toolkit"
import editorReducer from "./editorSlice"

/**
 * Configures the Redux store with the editor slice reducer.
 */
export const store = configureStore({
    reducer: {
         editor: editorReducer
    }
})

export type RootState = ReturnType<typeof store.getState>       
export type AppDispatch = typeof store.dispatch