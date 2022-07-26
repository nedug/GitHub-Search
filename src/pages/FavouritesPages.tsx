import React from 'react';
import { useAppSelector } from '../hooks/selector';
import { useActions } from '../hooks/actions';

export const FavouritesPages = () => {

    const favourites = useAppSelector(state => state.github.favourites);
    const { removeFavourites } = useActions();

    const removeFavourite = (e: React.MouseEvent<HTMLButtonElement>, url_rep: string) => {
        e.preventDefault();
        removeFavourites(url_rep);
    };

    return (
        favourites.length > 0
            ?
            <>
                {favourites.map(fav => {
                    return <a key={fav} href={fav} target="_blank">
                        <div
                            className="relative border border-gray-300 py-3 px-3 rounded mt-2 mr-2 ml-2 hover:shadow-md hover:bg-gray-200 transition-all">
                            {fav}

                            <button
                                className="absolute bottom-2 right-3 py-1 px-3 bg-red-300 rounded hover:shadow-md transition-all"
                                onClick={(e) => removeFavourite(e, fav)}
                            >
                                remove
                            </button>
                        </div>
                    </a>
                })}
            </>
            :
            <p className="text-center text-red-600 mt-3">Favourites list is empty...</p>
    );
};