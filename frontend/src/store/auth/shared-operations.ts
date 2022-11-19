import {
    FETCHING_AUTHENTICATED_USER,
    FINISH_PASSWORD_RESET,
    PASSWORD_RESET,
    REGISTER,
    SIGNIN,
    SIGNOUT,
    UPDATE_PROFILE,
} from "./constants";
import {
    fetchAuthenticatedUser,
    finishResetPassword,
    register,
    resetPassword,
    signin,
    signout,
    updateProfile,
} from "./thunks";

export const authSharedOperation = [
    {
        thunk: fetchAuthenticatedUser,
        updateKey: FETCHING_AUTHENTICATED_USER,
    },
    {
        thunk: register,
        updateKey: REGISTER,
    },
    {
        thunk: signin,
        updateKey: SIGNIN,
    },
    {
        thunk: signout,
        updateKey: SIGNOUT,
    },
    {
        thunk: updateProfile,
        updateKey: UPDATE_PROFILE,
    },
];

export const resetPasswordSharedOperation = [
    {
        thunk: resetPassword,
        updateKey: PASSWORD_RESET,
    },
    {
        thunk: finishResetPassword,
        updateKey: FINISH_PASSWORD_RESET,
    },
];
