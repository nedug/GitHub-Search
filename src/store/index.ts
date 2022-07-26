import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './github/github.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { githubReducer } from './github/github.slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


export const store = configureStore({
    reducer: {
        [githubApi.reducerPath]: githubApi.reducer,
        github: githubReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubApi.middleware),
});

setupListeners(store.dispatch);


// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch: () => AppDispatch = useDispatch;


// types
// export type AppRootStateType = ReturnType<typeof rootReducer> /* for rootReducer */
export type RootState = ReturnType<typeof store.getState>  /* for useSelector */
// export type AppDispatch = typeof store.dispatch /* for useDispatch */

