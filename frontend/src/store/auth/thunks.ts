import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { socket } from "../../App";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import { GlobalMessage } from "../types";
import {
    FETCH_AUTHENTICATED_USER_PREFIX,
    FETCH_AUTHENTICATED_USER_URL,
    FINISH_PASSWORD_RESET_PREFIX,
    PASSWORD_RESET_PREFIX,
    PASSWORD_RESET_URL,
    REGISTER_PREFIX,
    REGISTER_SOCKET_PREFIX,
    REGISTER_SOCKET_URL,
    REGISTER_URL,
    SIGNIN_PREFIX,
    SIGNIN_URL,
    SIGNOUT_PREFIX,
    SIGNOUT_URL,
    UPDATE_USER_PREFIX,
    UPDATE_USER_URL,
} from "./constants";
import { RegisterVars, SignInVars, UpdateUserVars, User } from "./types";

export const register = createAsyncThunk(REGISTER_PREFIX, async (vars: RegisterVars, { rejectWithValue }) => {
    try {
        const res = await axios.post(REGISTER_URL, { ...vars, socketId: socket.id });
        return { status: RequestLifeCycle.SUCCESS, data: res.data as User };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const signin = createAsyncThunk(SIGNIN_PREFIX, async (vars: SignInVars, { rejectWithValue }) => {
    try {
        const res = await axios.post(SIGNIN_URL, { ...vars, socketId: socket.id });
        return { status: RequestLifeCycle.SUCCESS, data: res.data as User };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const fetchAuthenticatedUser = createAsyncThunk(
    FETCH_AUTHENTICATED_USER_PREFIX,
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(FETCH_AUTHENTICATED_USER_URL);
            return { status: RequestLifeCycle.SUCCESS, data: res.data };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const registerSocket = createAsyncThunk(REGISTER_SOCKET_PREFIX, async (_, { rejectWithValue }) => {
    if (!socket.id) return;
    try {
        const res = await axios.post(REGISTER_SOCKET_URL, { socketId: socket.id });
        return { status: RequestLifeCycle.SUCCESS, data: res.data };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const signout = createAsyncThunk(SIGNOUT_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.post(SIGNOUT_URL, { socketId: socket.id });
        return { status: RequestLifeCycle.SUCCESS, data: res.data as User };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const resetPassword = createAsyncThunk(
    PASSWORD_RESET_PREFIX,
    async (vars: Pick<SignInVars, "email">, { rejectWithValue }) => {
        try {
            const res = await axios.post(PASSWORD_RESET_URL, vars);

            return { status: RequestLifeCycle.SUCCESS, data: res.data as GlobalMessage };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const finishResetPassword = createAsyncThunk(
    FINISH_PASSWORD_RESET_PREFIX,
    async (vars: { password: string; token: string }, { rejectWithValue }) => {
        try {
            const res = await axios.post(PASSWORD_RESET_URL + vars.token, vars);

            return { status: RequestLifeCycle.SUCCESS, data: res.data as GlobalMessage };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const updateProfile = createAsyncThunk(UPDATE_USER_PREFIX, async (vars: UpdateUserVars, { rejectWithValue }) => {
    try {
        const res = await axios.post(UPDATE_USER_URL, vars);

        return { status: RequestLifeCycle.SUCCESS, data: res.data as User };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
