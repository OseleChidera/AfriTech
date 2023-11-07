import { createSlice } from "@reduxjs/toolkit";
import { database } from '../firebase/firebaseConfig'
import { doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
const formEntries = {
    email: '',
    firstName: '',
    lastName: '',
    Username: '',
    Phone: '',
    address: '',
    passportnumber: '',
    ninnumber: '',
    agreeToTerms: false,
    image: undefined,
    image2: undefined,
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        value: undefined,
        valueObj:undefined,
        loading: false,
        signupIndex: 0,
        signinIndex: 0,
        userFormEntries: formEntries,
        hasStorageAccessPermission: true,
    },
    reducers: {
        setUserIdData: (state, action) => {
            state.value = action.payload
        },
        removeUserData: (state, action) => {
            state.value = action.payload
        },
        setUserObjData: (state, action) => {
            state.valueObj = action.payload
        },
        removeUserObjData: (state, action) => {
            state.valueObj = action.payload
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
        }

    }
})
export const { setUserIdData, removeUserData, setLoading, setUserObjData, incrementSignup, decrementSignup, incrementSignin, decrementSignin, incrementSigninByAmmount, updateUserFormEntries, grantStorageAccess } = userSlice.actions;

export const fetchDataByUserId = (userId,userObj) => async (dispatch) => {

    try {
        dispatch(setLoading(true));
        const docRef = doc(database, 'Users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            dispatch(setUserObjData(docSnap.data()));
            console.log('USER DATABASE INFO ', docSnap.data())
            console.log(typeof docSnap.data())
            setTimeout(() => {
                dispatch(setLoading(false));
            }, 1000);
            
        } else {
            console.log('No such document!');
        }


    } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(setLoading(false));
    }


};

export default userSlice.reducer;



