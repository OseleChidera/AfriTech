import { createSlice } from "@reduxjs/toolkit";
const formEntries = {
    email: 'oselechideratest4@gmail.com',
    password: '',
    confirm_password: '',
    firstname: '',
    lastname: '',
    Username: '',
    Phone: '',
    address: '',
    bvnnumber: '',
    ninnumber: '',
    agreeToTerms: false,
    profilePicture: null,
    ninSlipPicture: null,
    dateOfBirth: "",
    reuploadNin: false,
    accountVerified: false ,
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        value: undefined,
        loading: false,
        signupIndex: 0,
        signinIndex: 0,
        homePageNavIndex: 0,
        userFormEntries: formEntries,
        hasStorageAccessPermission: true,
        userAge: null,
        userData: null,
        currentUserData: null
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
        setSignupIndex: (state, action) => {
            state.signupIndex = action.payload
        },
        incrementSignin: (state, action = false) => {
            // console.log("action.payload" + " " + action.payload)
            if (action.payload) {
                return;
            }
            state.signinIndex += 1
        },
        decrementSignin: state => {
            state.signinIndex -= 1
        },
        incrementSigninToStartMultistep: (state) => {
            state.signinIndex = 2
        },
        sethomePageNavIndex: (state, action) => {
            state.homePageNavIndex = action.payload
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
            // console.log("ACTION PAYLOAD:" + action.payload)
            //  console.log("setUserData reducer function" + JSON.stringify(action.payload, null, 2))
            state.userData = action.payload
        },
        removeUserData: (state, action) => {
            state.userData = action.payload
        },
        setCurrentUserData: (state, action) => {
            // console.log("ACTION PAYLOAD:" + action.payload)
            state.currentUserData = action.payload
        },
    }
})
export const { setUserIdData, setUserData, removeUserData, setLoading, incrementSignup, decrementSignup, incrementSignin, decrementSignin, incrementSigninToStartMultistep, incrementSigninByAmmount, updateUserFormEntries, grantStorageAccess, sethomePageNavIndex, setCurrentUserData, setSignupIndex } = userSlice.actions;
// export const userData = (state) => state.user.userData;
export default userSlice.reducer;



