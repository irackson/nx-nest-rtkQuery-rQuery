import type { Todo } from '@nest-todos/shared-types';
import { BASE_URL } from '@nest-todos/shared-types';

export const seedData = async (): Promise<string> =>
    fetch(`${BASE_URL[0]}/seedData`).then((res) => res.json());

export const getTodos = async (): Promise<Todo[]> =>
    fetch(`${BASE_URL[0]}/`).then((res) => res.json());

export const getTodo = async (id: Todo['id']): Promise<Todo> =>
    fetch(`${BASE_URL[0]}/find?id=${id}`).then((res) => res.json());

export const createTodo = async (text: Todo['text']): Promise<number> =>
    fetch(`${BASE_URL[0]}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    }).then((res) => res.status);

export const updateTodo = async (todo: Todo): Promise<number | boolean> =>
    fetch(`${BASE_URL[0]}/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    }).then((res) =>
        res.status !== 204
            ? Promise.reject(res.status)
            : Promise.resolve(res.ok)
    );

export const deleteTodo = async (id: Todo['id']): Promise<void> =>
    fetch(`${BASE_URL[0]}/${id}`, {
        method: 'DELETE',
    }).then((res) =>
        res.status !== 204 ? Promise.reject(res.status) : Promise.resolve()
    );
