import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: "form",
    initialState: {
        formData: {},
    },
    reducers: {
        updateUser: (state, action) => {
            state.formData = action.payload
        }
    }
})
export const { updateValues } = formSlice.actions;
export const selectFormData = (state) => state.form.formData;
export default formSlice.reducer;