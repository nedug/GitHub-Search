import React from 'react';
import { useSearchUsersQuery } from '../store/github/github.api';

export const HomePage = () => {

    const {isLoading, isError, data} = useSearchUsersQuery('nedug');

    console.log(isLoading, isError, data)

    return (
        <div>
            Home
        </div>
    );
};