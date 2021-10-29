import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { todoApi } from '../store';
import './App.css';
import type { Todo } from '@nest-todos/shared-types';
import { Fragment, useCallback, useRef } from 'react';

export function TodoApp() {
    const { data: todos } = todoApi.useGetAllQuery();
    const [updateTodo] = todoApi.useUpdateTodoMutation();
    const [deleteTodo] = todoApi.useDeleteTodoMutation();
    const [addTodo] = todoApi.useAddTodoMutation();
    const [resetTodos] = todoApi.useResetTodosMutation();

    const textRef = useRef<HTMLInputElement>(null);

    const onToggle = useCallback(
        (todo: Todo) => {
            updateTodo({
                ...todo,
                done: !todo.done,
            });
        },
        [updateTodo]
    );

    const onDelete = useCallback(
        (todo: Todo) => {
            deleteTodo(todo);
        },
        [deleteTodo]
    );

    const onAdd = useCallback(() => {
        const text = textRef.current!.value.trim();
        if (text) {
            // document.forms.namedItem('my_form')?.reset();
            textRef.current!.value = '';
            textRef.current!.focus();

            addTodo({ text });
        }
    }, [addTodo]);

    const onReset = useCallback(() => {
        resetTodos();
    }, [resetTodos]);

    return (
        <div className="App">
            <div className="todos">
                {todos
                    ?.slice()
                    .filter(({ active }) => active === true)
                    .reverse()
                    .map((todo) => (
                        <Fragment key={todo.id}>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={() => onToggle(todo)}
                                />
                                <span>{todo.text}</span>
                            </div>
                            <button onClick={() => onDelete(todo)}>
                                Delete
                            </button>
                        </Fragment>
                    ))}
            </div>
            <form name="my_form">
                <div className="add">
                    <input type="text" ref={textRef} />
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            onAdd();
                        }}
                    >
                        Add
                    </button>
                </div>
            </form>
            <button
                onClick={(e) => {
                    e.preventDefault(), onReset();
                }}
            >
                seed data
            </button>
        </div>
    );
}

function App() {
    return (
        <ApiProvider api={todoApi}>
            <TodoApp />
        </ApiProvider>
    );
}

export default App;
