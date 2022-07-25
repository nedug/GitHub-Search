import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Irepo, IUser, ServerResponse } from '../../models/models';


// Настраиваем API (которая автоматически генерирует хуки React для каждого определенного запроса и мутации endpoints)
export const githubApi = createApi({
    reducerPath: 'github/api', /* адрес редюсера */

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com', /* Основной URL */
    }),

    refetchOnFocus: true, /* Автоматический запрос при фокусе вкладки браузера */

    endpoints: (builder) => ({
        searchUsers: builder.query<IUser[], string>({
            query: (search: string) => ({
                url: `search/users`,

                params: { /* Query параметры */
                    q: search,
                    per_page: 15,
                }
            }),
            transformResponse: (response: ServerResponse<IUser>) => response.items /* доп. обработка ответа сервера */
        }),

        getUserRepos: builder.query<Irepo[], string>({
            query: (login: string) => ({
                url: `users/${login}/repos`,
            }),
        }),
    }),
});


// Автоматические Хуки для запросов на API
/* Lazy позволяет сделать запрос не сразу а в нужный момент */
export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
