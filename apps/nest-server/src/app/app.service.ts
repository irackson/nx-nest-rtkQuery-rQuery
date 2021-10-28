import { Injectable } from '@nestjs/common';

interface Todo {
    id: number;
    text: string;
    done: boolean;
}

export const initialTodos: Todo[] = [
    { id: 0, text: 'Learn NestJS', done: false },
    { id: 1, text: 'Learn TypeScript', done: false },
    { id: 2, text: 'Learn GraphQL', done: false },
];

@Injectable()
export class AppService {
    private todos: Todo[] = [];

    getData(): Todo[] {
        return this.todos;
    }

    seedData() {
        console.log('hi');

        this.todos = initialTodos;
        return { message: `seed ${this.todos.length} todo(s)` };
    }

    add(text: string) {
        this.todos.push({
            id: this.todos.length,
            text,
            done: false,
        });
    }

    setDone(id: number, done: boolean) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? { ...todo, done } : todo
        );
    }
}
