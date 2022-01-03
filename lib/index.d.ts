import Async, { IAsyncOptions } from '@watch-state/async';
import { State } from 'watch-state';
export interface FetchOptions extends RequestInit, Omit<IAsyncOptions, 'request'> {
    type?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';
}
export default class Fetch<V = any, E = any> extends Async<V, E> {
    _answer: State<any>;
    get answer(): any;
    set answer(value: any);
    constructor(url: string, options?: FetchOptions);
}
