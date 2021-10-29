import { BASE_URL, Todo } from '@nest-todos/shared-types';
import {
    getTodos,
    updateTodo,
    createTodo,
    deleteTodo,
    seedData,
} from '../lib/api';
import './App.css';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
} from 'react-query';
import { FC, Fragment, useRef } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';

const queryClient = new QueryClient();

export const axiosClient = axios.create({
    baseURL: BASE_URL[0],
});

const TodoApp: FC = () => {
    const textRef = useRef<HTMLInputElement>(null);

    //* without axios / with axios versions are interchangeable.
    //* comment out the one you don't want to use.
    //! without axios
    // const { data: todos } = useQuery<Todo[]>('todos', getTodos, {
    //     initialData: [],
    // });
    //! with axios
    const { data: todos } = useQuery<Todo[]>(
        'todos',
        async () => await (await axiosClient.get<Todo[]>('/')).data,
        {
            initialData: [],
        }
    );

    //! without axios
    // const resetMutation = useMutation(seedData, {
    //     onSuccess: () => queryClient.invalidateQueries('todos'),
    // });
    //! with axios
    const resetMutation = useMutation<Response, unknown>(
        async () => await axiosClient.get('/seedData'),
        {
            onSuccess: () => queryClient.invalidateQueries('todos'),
        }
    );

    //! without axios
    // const updateMutation = useMutation(updateTodo, {
    //     onSuccess: () => queryClient.invalidateQueries('todos'),
    // });
    //! with axios
    const updateMutation = useMutation<Response, unknown, Todo>(
        (todo) => axiosClient.put(`/${todo.id}`, todo),
        {
            onSettled: () => queryClient.invalidateQueries('todos'),
        }
    );

    //! without axios
    // const deleteMutation = useMutation(deleteTodo, {
    //     onSuccess: () => queryClient.invalidateQueries('todos'),
    // });
    //! with axios
    const deleteMutation = useMutation<Response, unknown, number>(
        (id) => axiosClient.delete(`/${id}`),
        {
            onSettled: () => queryClient.invalidateQueries('todos'),
        }
    );

    //! without axios
    // const createMutation = useMutation(createTodo, {
    //     onSuccess: () => queryClient.invalidateQueries('todos'),
    // });
    //! with axios
    const createMutation = useMutation<Response, unknown, Todo['text']>(
        (newText) => axiosClient.post('/', { text: newText }),
        {
            onSettled: () => queryClient.invalidateQueries('todos'),
        }
    );

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
            <button
                onClick={(e) => {
                    e.preventDefault(), resetMutation.mutate();
                }}
            >
                seed data
            </button>
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
