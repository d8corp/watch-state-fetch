import Async from '@watch-state/async';
export interface FetchOptions<V = any> extends RequestInit {
    type?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';
    defaultValue?: V;
}
export default class Fetch<V, E = unknown> extends Async<V, E> {
    #private;
    private _response;
    get response(): Response;
    constructor(url: RequestInfo | URL, options?: FetchOptions<V>);
    protected resolve(value: V | E): void;
}
