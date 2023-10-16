import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetail: null,
};

const AuthSlice = createSlice({
    name: "Auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.userDetail = action.payload;
        },
    }
});

export default AuthSlice.reducer;

export const { login } = AuthSlice.actions;