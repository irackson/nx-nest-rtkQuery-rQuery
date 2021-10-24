import { Injectable } from '@nestjs/common';

interface Todo {
    id: number;
    text: string;
    done: boolean;
}

@Injectable()
export class AppService {
    private todos: Todo[] = [];

    getData(): Todo[] {
        return this.todos;
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
