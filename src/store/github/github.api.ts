import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IUser, ServerResponse } from '../../models/models';


// Настраиваем API (которая автоматически генерирует хуки React для каждого определенного запроса и мутации endpoints)
export const githubApi = createApi({
    reducerPath: 'github/api', /* адрес редюсера */

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com', /* Основной URL */
    }),

    endpoints: (builder) => ({
        searchUsers: builder.query<IUser[], string>({
            query: (search: string) => ({
                url: `search/users`,

                params: { /* Query параметры */
                    q: search,
                    per_page: 10,
                }
            }),
            transformResponse: (response: ServerResponse<IUser>) => response.items /* доп. обработка ответа сервера */
        }),
    }),
});

// Автоматические Хуки для запросов на API
export const { useSearchUsersQuery } = githubApi;