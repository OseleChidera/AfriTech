import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload
        },
        signoutUser: (state, action) => {
            state.currentUser = action.payload
        }
    }
})
export const { setUser, signoutUser } = userSlice.actions;
export default userSlice.reducer;

