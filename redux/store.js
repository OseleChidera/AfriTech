import { configureStore } from '@reduxjs/toolkit';
import formReducer from './updateUser'

export const store = configureStore({
    reducer: {
        form: formReducer,
    },
});