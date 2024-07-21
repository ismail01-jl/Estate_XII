import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentuser: 0,
    errors: null,
    loading: false,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.currentuser = action.payload;
            state.loading = false;
            state.errors = null;
        },
        loginFailed: (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        },

        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentuser = action.payload;
            state.loading = false;
            state.errors = null;
        },

        updateUserFailure: (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        },
        deleteUserStart : (state) =>{
            state.loading = true;
        },
        deleteUserSuccess : (state, action) => {
            state.currentuser = null;
            state.loading = false;
            state.errors = null;
        },
        deleteUserFailure : (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        },

    }
});
export const { login,
    loginSuccess,
    loginFailed,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} = userSlice.actions;
export default userSlice.reducer;