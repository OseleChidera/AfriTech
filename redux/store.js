import { configureStore } from '@reduxjs/toolkit';
// import formReducer from './updateUser'
import fogortPasswordCounterReducer from './forgotPasswordIndex'
import userReducer from './user'
// import userDataReducer from './userData'

export const store = configureStore({
    reducer: {
        // form: formReducer,
        fogortPasswordCounter  : fogortPasswordCounterReducer,
        user: userReducer,
        // userData: userDataReducer
    },
});