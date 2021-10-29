import type { Todo } from '@nest-todos/shared-types';
import { getTodos, updateTodo, createTodo, deleteTodo } from '../lib/api';
import './App.css';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
} from 'react-query';
import { FC, Fragment, useRef } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export const TodoApp: FC = () => {
    const textRef = useRef<HTMLInputElement>(null);

    const { data: todos } = useQuery<Todo[]>('todos', getTodos, {
        initialData: [],
    });

    const updateMutation = useMutation(updateTodo, {
        onSuccess: () => queryClient.invalidateQueries('todos'),
    });

    const deleteMutation = useMutation(deleteTodo, {
        onSuccess: () => queryClient.invalidateQueries('todos'),
    });

    const createMutation = useMutation(createTodo, {
        onSuccess: () => queryClient.invalidateQueries('todos'),
    });

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
                                    onChange={() => {
                                        updateMutation.mutate({
                                            ...todo,
                                            done: !todo.done,
                                        });
                                    }}
                                />
                                <span>{todo.text}</span>
                            </div>
                            <button
                                onClick={() => {
                                    deleteMutation.mutate(todo.id);
                                }}
                            >
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
                            const valid = ((v) =>
                                v && v.length > 0
                                    ? createMutation.mutate(v)
                                    : null)(textRef.current?.value.trim());
                            typeof valid === 'undefined' &&
                                textRef.current?.focus(),
                                (textRef.current!.value = '');
                        }}
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TodoApp />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default App;
