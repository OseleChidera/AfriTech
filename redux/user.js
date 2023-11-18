import { createSlice } from "@reduxjs/toolkit";
const formEntries = {
    email: 'oselechidwerwedeera590@gmail.com',
    firstName: '',
    lastName: '',
    Username: '',
    Phone: '',
    address: '',
    bvnnumber: '',
    ninnumber: '',
    agreeToTerms: false,
    profilePicture: undefined,
    image2: undefined,
    dateOfBirth: null,
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        value: undefined,
        loading: false,
        signupIndex: 0,
        signinIndex: 0,
        userFormEntries: formEntries,
        hasStorageAccessPermission: true,
        userAge: null,
        userData: null
    },
    reducers: {
        setUserIdData: (state, action) => {
            state.value = action.payload
        },
        removeUserIdData: (state, action) => {
            state.value = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        incrementSignup: (state, action = false) => {
            if (action.payload) {
                return;
            }
            state.signupIndex += 1
        },
        decrementSignup: state => {
            state.signupIndex -= 1
        },
        incrementSignin: (state, action = false) => {
            if (action.payload) {
                return;
            }
            state.signinIndex += 1
        },
        decrementSignin: state => {
            state.signinIndex -= 1
        },
        incrementSigninByAmmount: (state, action) => {
            state.signinIndex = action.payload
        },
        updateUserFormEntries: (state, action) => {
            state.userFormEntries = action.payload
        },
        grantStorageAccess: (state, action) => {
            state.hasStorageAccessPermission = action.payload
        },
         setUserData: (state, action) => {
            console.log("ACTION PAYLOAD:" + action.payload)
            state.userData = action.payload
        },
        removeUserData: (state, action) => {
            state.userData = action.payload
        }
    }
})
export const { setUserIdData, setUserData , removeUserData, setLoading, incrementSignup, decrementSignup, incrementSignin, decrementSignin, incrementSigninByAmmount, updateUserFormEntries, grantStorageAccess } = userSlice.actions;
// export const userData = (state) => state.user.userData;
export default userSlice.reducer;



