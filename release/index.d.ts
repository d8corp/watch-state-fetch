import Async from '@watch-state/async';
export interface FetchOptions<V = any, E = Error> extends RequestInit {
    type?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';
    resolve?: (...a: any[]) => V;
    reject?: (...a: any[]) => E;
    defaultValue?: V;
}
export default class Fetch<V, E = Error> extends Async<V, E> {
    #private;
    protected options: FetchOptions<V, E>;
    get response(): Response;
    constructor(url: RequestInfo | URL, options?: FetchOptions<V, E>);
    protected resolve(value: V): void;
    protected reject(error: E): void;
}
