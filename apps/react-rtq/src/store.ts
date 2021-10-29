import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Todo } from '@nest-todos/shared-types';

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/api' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getAll: builder.query<Todo[], void>({
            query: () => `/`,
            providesTags: [{ type: 'Todos', id: 'LIST' }],
        }),
        updateTodo: builder.mutation<Todo, Todo>({
            query(todo) {
                return {
                    url: `/${todo.id}`,
                    method: 'PUT',
                    body: todo,
                };
            },
            invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
        }),
        deleteTodo: builder.mutation<Todo, Todo>({
            query(todo) {
                return {
                    url: `/${todo.id}`,
                    method: 'DELETE',
                    body: todo,
                };
            },
            invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
        }),
    }),
});
