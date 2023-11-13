import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        userData: null
    },
    reducers: {
        setUserData: (state, action) => {
            console.log("ACTION PAYLOAD:" + action.payload)
            state.userData = action.payload
        },
        removeUserData: (state, action) => {
            state.userData = action.payload
        }
    }
})
export const { setUserData, removeUserData } = userDataSlice.actions;
export const userData = (state) => state.userData.userData;
export default userDataSlice.reducer;



