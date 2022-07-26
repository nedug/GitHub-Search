import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const LS_FAV_KEY = 'rfk';

type GithubState = {
    favourites: string[]
}

const initialState: GithubState = {
    favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
};

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavourites(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload);
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
        },
        removeFavourites(state, action: PayloadAction<string>) {
            state.favourites = state.favourites.filter(fav => fav !== action.payload);
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
        },
    },
});

// Создаем Reducer с помощью slice
export const githubReducer = githubSlice.reducer;

// Создаем Actions с помощью slice
// export const { addFavourites, removeFavourites } = githubSlice.actions;
export const githubActions = githubSlice.actions;