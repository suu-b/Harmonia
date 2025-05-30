import { createSlice } from "@reduxjs/toolkit"
import { FinalDataTreeStructure}  from "../types/workspace-data"

const initialState = { workspaceData: [] as FinalDataTreeStructure[] }

/**
 * Slice for managing workspace data in the Redux store.
 */
const workspaceDataSlice = createSlice({
    name: "workspaceData",
    initialState,
    reducers: {
        setWorkspaceData: (state, action) => {
            console.log(action.payload)
            state.workspaceData = action.payload
            console.log(state.workspaceData)
        }
    }
})

export const { setWorkspaceData } = workspaceDataSlice.actions
export default workspaceDataSlice.reducer