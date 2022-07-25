import React, { useEffect, useState } from 'react';
import { useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';

export const HomePage = () => {
    const [search, setSearch] = useState('');

    const searchDeb = useDebounce(search);

    const { isLoading, isError, data } = useSearchUsersQuery(searchDeb, {
        skip: searchDeb.length < 3 /* Запрос не будет выполняться если кол. симоволов меньше 2 */
    });

    // console.log(isLoading, isError, data)


    useEffect(() => {
        console.log(searchDeb)
    }, [searchDeb])


    return (
        <div className="flex-col justify-center pt-10 mx-auto h-screen w-screen">

            {isError && <p className="text-center text-red-600">Something went wrong...</p>}

            <div className="relative w-[560px]">
                <input
                    type="text"
                    className="border px-4 py-2 w-full h-[42px] mb-2"
                    placeholder="Search for GitGub username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <ul className="absolute list-none top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white">

                    {isLoading && <p className="text-center">Loading...</p>}


                    <li></li>
                </ul>
            </div>


            {/*{*/}
            {/*    data?.map(({ login, id }) => {*/}
            {/*        return <div key={id}>{login}</div>*/}
            {/*    })*/}
            {/*}*/}
        </div>
    );
};