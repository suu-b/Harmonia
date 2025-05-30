import {configureStore} from "@reduxjs/toolkit"
import editorReducer from "./editorSlice"
import workspaceDataReducer from "./workspaceDataSlice"

/**
 * Configures the Redux store with the editor slice reducer.
 */
export const store = configureStore({
    reducer: {
         editor: editorReducer,
         workspaceData: workspaceDataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>       
export type AppDispatch = typeof store.dispatch