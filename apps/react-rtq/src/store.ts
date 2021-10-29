import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Todo } from '@nest-todos/shared-types';
import { BASE_URL } from '@nest-todos/shared-types';

type Text = Pick<Todo, 'text'>;

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL[0] }),
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
        addTodo: builder.mutation<Text, Text>({
            query(text: Text) {
                return {
                    url: `/`,
                    method: 'POST',
                    body: text,
                };
            },
            invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
        }),
        resetTodos: builder.mutation<Todo[], void>({
            query: () => '/seedData',
            invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
        }),
    }),
});
