import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

export const remoteStore = configureStore({
    reducer: {}
})

export type AppDispatch = typeof remoteStore.dispatch;
export type RootState = ReturnType<typeof remoteStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;