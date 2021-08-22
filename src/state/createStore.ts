import {combineReducers} from "redux";
import taskSlice, {initialState as initTaskState} from "./Task";
import {configureStore} from "@reduxjs/toolkit";

//親のストア
const rootReducer = combineReducers({
    taskState: taskSlice.reducer
})

//初期値
const preLoadedState = () => {
    return {taskState: initTaskState}
}

export type StoreState = ReturnType<typeof preLoadedState>;

const createStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        //デバッグフラグを立てる
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState: preLoadedState()
    });
    return store;
}

export default createStore;
