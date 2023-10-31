import { configureStore } from '@reduxjs/toolkit';
import formReducer from './updateUser'
import signupCounterReducer from './forgotPasswordIndex'
import userReducer from './user'

export const store = configureStore({
    reducer: {
        form: formReducer,
        signupCounter  : signupCounterReducer,
        user: userReducer
    },
});