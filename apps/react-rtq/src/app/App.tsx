import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { todoApi } from '../store';
import './App.css';
import type { Todo } from '@nest-todos/shared-types';
import { Fragment } from 'react';

export function TodoApp() {
    const { data: todos } = todoApi.useGetAllQuery();

    return (
        <div className="App">
            <div className="todos">
                {todos?.map((todo) => (
                    <Fragment key={todo.id}>
                        <div>
                            <input
                                type="checkbox"
                                checked={todo.done}
                                onChange={() => {}}
                            />
                            <span>{todo.text}</span>
                        </div>
                        <button onClick={() => {}}>Delete</button>
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
