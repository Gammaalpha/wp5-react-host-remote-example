import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

export const containerStore = configureStore({
    reducer: {}
})

export type AppDispatch = typeof containerStore.dispatch;
export type RootState = ReturnType<typeof containerStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;