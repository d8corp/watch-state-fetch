import Async from '@watch-state/async';
export interface FetchOptions<V = any> extends RequestInit {
    type?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';
    defaultValue?: V;
}
export default class Fetch<V, E = Error> extends Async<V, E> {
    #private;
    private _response;
    get response(): Response;
    constructor(url: RequestInfo | URL, options?: FetchOptions<V>);
    protected asyncResolve(value: V | E): void;
    protected fetchReject(error: E): void;
    protected fetchResolve(value: V): void;
}
