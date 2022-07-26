import React, { useEffect, useState } from 'react';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import { RepoCard } from '../components/RepoCard';

export const HomePage = () => {
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const searchDeb = useDebounce(search);

    const { isLoading, isError, data } = useSearchUsersQuery(searchDeb, {
        skip: searchDeb.length < 3, /* Запрос не будет выполняться если кол. симоволов меньше 2 */
        refetchOnFocus: true, /* Автоматический запрос при фокусе вкладки браузера */
    });

    const [fetchRepos, { isLoading: areReposLoading, isError: Error, data: repos }] = useLazyGetUserReposQuery();

    const clickHandler = (login: string) => {
        fetchRepos(login);
        setDropdown(false);
        setSearch('');
    };

    useEffect(() => {
        setDropdown(searchDeb.length > 2 && data?.length! > 0)
    }, [searchDeb, data]);

    if (isError) return <p className="text-center text-red-600 mt-2">Something went wrong... Reload page</p>;

    return (
        <div className="flex justify-center pt-10 mx-auto">


            <div className="relative w-[560px]">
                <input
                    type="text"
                    className="border border-gray-300 rounded px-4 py-2 w-full h-[42px] mb-2"
                    placeholder="Search for GitGub username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {dropdown &&
                    <ul
                        className="absolute list-none top-[42px] left-0 right-0 max-h-[300px] overflow-y-scroll shadow-md bg-white">

                        {isLoading && <p className="text-center">Loading...</p>}

                        {data?.map(({ login, id, avatar_url }) => (

                            <li
                                key={id}
                                onClick={() => clickHandler(login)}
                                className="relative py-3 px-4 rounded hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                            >
                                {login}
                                <img
                                    className="absolute top-2 right-5"
                                    src={avatar_url}
                                    alt="avatar"
                                    height="35px"
                                    width="35p"
                                />
                            </li>
                        ))}
                    </ul>
                }

                <div className="container">
                    {areReposLoading
                        ?
                        <p className="text-center">Repos are loading...</p>
                        :
                        repos?.length === 0
                            ?
                            <p className="text-center text-red-600 mt-2">Repos not found... try again</p>
                            :
                            repos?.map(repo => <RepoCard key={repo.id} repo={repo} />)
                    }
                </div>
            </div>
        </div>
    );
};