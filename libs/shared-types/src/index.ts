export * from './lib/shared-types';

export interface Todo {
    id: number;
    text: string;
    active: boolean;
    done: boolean;
}

export enum BASE_URL {
    'http://localhost:3333/api',
}
