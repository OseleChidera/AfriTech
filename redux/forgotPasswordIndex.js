import { createSlice } from "@reduxjs/toolkit";

const signupCounterSlice = createSlice({
    name: "signupCounter",
    initialState: {
        currentIndex: 0,
    },
    reducers: {
      
    nextStep : (state , final = false)=>{
        if (final) {
            return ;
        }
            state.value += 1
        },
    prevStep: (state, final = false) => {
        
        state.value -= 1
        },
    reset: (state, action) => {
            state.formData = action.payload
        }
    }
})
export const { updateValues } = signupCounterSlice.actions;
export const selectsignupCounter = (state) => state.signupCounter.currentIndex;
export default signupCounterSlice.reducer;