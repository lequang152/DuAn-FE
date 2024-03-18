import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthenticationUserState } from '../../../constants/AuthenticationState';
import { AuthLoginInputState } from '../../../constants/AuthenticationState';
import { ApiService } from '../../../utils/api_service';

const initialState: AuthenticationUserState = {
    isAuthenticated: false,
    token: '',
    refreshToken: '',
    tokenExpires: 0,
    keepSign: false,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            localStorage.removeItem('session');
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postLogin.rejected, (state, action) => {});
        builder.addCase(postLogin.fulfilled, (state, action) => {
            state.token = action.payload.data.data.token;
            state.refreshToken = action.payload.data.data.refreshToken;
            state.isAuthenticated = action.payload.data.data.isAuthenticated;
            state.keepSign = action.payload.userInput.keepSign;
            state.tokenExpires = action.payload.data.data.tokenExpires;
            state.user = action.payload.data.data.user;
            state.keepSign ? localStorage.setItem('session', JSON.stringify(action.payload.data)) : null;
            return state;
        });
        builder.addCase(loadTokenFromLocal.fulfilled, (state, action) => {
            if (action.payload) {
                const data = JSON.parse(action.payload);
                return {
                    ...state,
                    ...data,
                };
            } else {
                return {
                    ...state,
                };
            }
        });
        builder.addCase(refreshUnexpriredToken.fulfilled, (state, action) => {
            if (action.payload) {
                const data = JSON.parse(action.payload);
                return {
                    ...state,
                    ...data,
                };
            } else {
                return {
                    ...state,
                };
            }
        });
    },
});

export const postLogin = createAsyncThunk('auth/postLogin', async (userInput: AuthLoginInputState) => {
    const res = await ApiService.Login(userInput);

    localStorage.setItem('session', JSON.stringify(res.data));
    return { data: res, userInput: userInput };
});
export const loadTokenFromLocal = createAsyncThunk('auth/loadToken', async () => {
    const session = localStorage.getItem('session');

    return session;
});

export const refreshUnexpriredToken = createAsyncThunk('auth/refreshToken', async () => {
    const res = await ApiService.refreshToken();

    const session = localStorage.getItem('session');
    return session;
});

export default AuthSlice;

export const { logOut } = AuthSlice.actions;
