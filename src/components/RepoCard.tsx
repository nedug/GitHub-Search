import React from 'react';
import { Irepo } from '../models/models';

export const RepoCard = ({ repo }: { repo: Irepo }) => {

    const addFavourite = () => {

    };

    return (
        <div className="border border-gray-300 py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-200 transition-all">
            <a href={repo.html_url} target="_blank">
                <h2 className="text-lg font-bold">{repo.full_name}</h2>
                <p className="text-sm">
                    Forks: <span className="font-bold mr-3">{repo.forks}</span>
                    Watchers: <span className="font-bold">{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin mt-2">{repo?.description}</p>

                <button
                    className="py-1 px-3 mt-3 bg-yellow-300 rounded hover:shadow-md transition-all"
                    onClick={addFavourite}
                >
                    Add
                </button>
            </a>

        </div>
    );
};