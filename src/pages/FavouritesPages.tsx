import React from 'react';
import { useAppSelector } from '../hooks/selector';

export const FavouritesPages = () => {

    const favourites = useAppSelector(state => state.github.favourites);

    return (
        favourites.length > 0
            ?
            <>
                {favourites?.map(fav => <div key={fav}>{fav}</div>)}
            </>
            :
            <p className="text-center text-red-600">Favourites list is empty...</p>
    );
};