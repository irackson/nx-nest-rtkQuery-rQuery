import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { todoApi } from '../store';
import './App.css';
import type { Todo } from '@nest-todos/shared-types';
import { Fragment, useCallback } from 'react';

export function TodoApp() {
    const { data: todos } = todoApi.useGetAllQuery();
    const [updateTodo] = todoApi.useUpdateTodoMutation();
    const [deleteTodo] = todoApi.useDeleteTodoMutation();

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

    return (
        <div className="App">
            <div className="todos">
                {todos
                    ?.filter(({ active }) => active === true)
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
