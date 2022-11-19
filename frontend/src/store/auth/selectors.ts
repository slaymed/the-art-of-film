import { createSelector } from "@reduxjs/toolkit";

import { GlobalOperation, RootState } from "../types";
import { RegisterErrors, SigninErrors, User } from "./types";

export const user = createSelector(
    (state: RootState) => state.auth.user,
    (user: User | null) => user
);

export const registerOperation = createSelector(
    (state: RootState) => state.auth.register,
    (registerOperation: { loading: boolean; errors: RegisterErrors }) => registerOperation
);

export const signinOperation = createSelector(
    (state: RootState) => state.auth.signin,
    (signinOperation: { loading: boolean; errors: SigninErrors }) => signinOperation
);

export const signoutOperation = createSelector(
    (state: RootState) => state.auth.signout,
    (signout: GlobalOperation) => signout
);

export const fetchingUserOperation = createSelector(
    (state: RootState) => state.auth.fetching,
    (fetchingOperation: GlobalOperation) => fetchingOperation
);

export const passwordResetOperation = createSelector(
    (state: RootState) => state.auth.passwordReset,
    (passwordReset: GlobalOperation) => passwordReset
);

export const finishingPasswordReset = createSelector(
    (state: RootState) => state.auth.finishingPasswordReset,
    (finishingPasswordReset: GlobalOperation) => finishingPasswordReset
);

export const updatingProfile = createSelector(
    (state: RootState) => state.auth.update,
    (update: GlobalOperation) => update
);
