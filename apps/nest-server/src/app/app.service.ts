import type { Todo } from '@nest-todos/shared-types';

import { Injectable } from '@nestjs/common';

export const initialTodos: Todo[] = [
    'NestJS',
    'GraphQL',
    'Apollo',
    'TypeScript',
    'React',
    'Redux',
    'React Query',
    'Angular',
    'Vue',
    'D3',
    'Svelte',
    'SolidJS',
    'NextJS',
    'AWS',
].map((text, index) => ({
    id: index + 1,
    text: `Learn ${text}`,
    active: true,
    done: false,
}));

@Injectable()
export class AppService {
    private todos: Todo[] = [];

    getData(): Todo[] {
        return this.todos;
    }

    getOne(id: number) {
        console.log('getOne', id);
        return (
            this.todos.find((todo) => todo.id === id) ?? {
                error: 'no todo with that id',
            }
        );
    }

    add(text: string) {
        this.todos.push({
            id: this.todos.length + 1,
            text,
            active: true,
            done: false,
        });
    }

    update(id: number, { text, done }: { text: string; done: boolean }) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? { ...todo, text, done } : todo
        );
    }

    remove(id: number) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? { ...todo, active: false } : todo
        );
    }

    seedData() {
        console.log('seeding data');
        this.todos = initialTodos;
        return { message: `seeded ${this.todos.length} todo(s)` };
    }
}
