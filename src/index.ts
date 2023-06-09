import Async from '@watch-state/async'
import { event, state } from '@watch-state/decorators'

export interface FetchOptions<V = any> extends RequestInit {
  type?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'
  defaultValue?: V
}

export default class Fetch<V, E = unknown> extends Async<V, E> {
  @state accessor #response: Response
  private _response: Response
  get response () {
    return this.#response
  }

  constructor (url: RequestInfo | URL, options: FetchOptions<V> = {}) {
    super(() => fetch(url, options).then(response => {
      this._response = response

      return response.status === 204 ? undefined : response[options.type || 'json']()
    }), options.defaultValue)
  }

  @event protected resolve (value: V | E) {
    this.#response = this._response

    if (this._response.status > 399) {
      return super.reject(value as E)
    }

    return super.resolve(value as V)
  }
}
