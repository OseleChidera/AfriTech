import { createSlice } from "@reduxjs/toolkit";
import {database} from '../firebase/firebaseConfig'
import { doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
const formEntries = {
  email: 'oselechidera560@gmail.com',
  password: '11111111',
  confirm_password: '11111111',
  firstName: 'Mustapha',
  lastName: 'JIMOH',
  Username: 'SSSSSS',
  Phone: '9012555781',
  address: '135 aransiol close oyaderan extate',
  passportnumber: 'a11111',
  image: null,
  ninnumber: '111111',
  image2: null,
  agreeToTerms: false
}
const userSlice = createSlice({
    name: "user",
    initialState: {
        value: null,
        valueObj: null,
        loading: false,
        signupIndex: 0,
        signinIndex: 0,
        userFormEntries: formEntries,
        hasStorageAccessPermission: false,
    },
    reducers: {
        setUserData: (state, action) => {
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
export const { setUserData, removeUserData, setLoading, setUserObjData, incrementSignup, decrementSignup, incrementSignin, decrementSignin, incrementSigninByAmmount, updateUserFormEntries, grantStorageAccess } = userSlice.actions;

export const fetchDataByUserId = (userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const docRef = doc(database, 'Users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            dispatch(setUserObjData(docSnap.data()));
            setTimeout(() => {
                dispatch(setLoading(false));
            }, 1000);
            console.log('user data found', docSnap.data())
            if (!docSnap.data().firstName || !docSnap.data().Username || !docSnap.data().address) {
                console.log('This user doesnt exist o runnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
                dispatch(incrementSigninByAmmount(2))
            }
        } else {
            console.log('No such document!');
        }

        
    } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(setLoading(false));
    }

    
};

export default userSlice.reducer;
