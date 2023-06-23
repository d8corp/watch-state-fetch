import Async from '@watch-state/async'
import { event, state } from '@watch-state/decorators'

export interface FetchOptions<V = any, E = Error> extends RequestInit {
  type?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'
  resolve?: (...a: any[]) => V
  reject?: (...a: any[]) => E
  defaultValue?: V
}

export default class Fetch<V, E = Error> extends Async<V, E> {
  @state accessor #response: Response
  private _response: Response
  get response () {
    return this.#response
  }

  constructor (url: RequestInfo | URL, protected options: FetchOptions<V, E> = {}) {
    super(() => fetch(url, options).then(response => {
      this._response = response

      return response.status === 204 ? undefined : response[options.type || 'json']()
    }), options.defaultValue)
  }

  @event protected asyncResolve (value: V | E) {
    this.#response = this._response

    if (this._response.ok) {
      this.fetchResolve(value as V)
    } else {
      this.fetchReject(value as E)
    }
  }

  protected fetchReject (error: E) {
    const { reject } = this.options

    if (reject) {
      error = reject(error)
    }

    this.reject(error)
  }

  protected fetchResolve (value: V) {
    const { resolve } = this.options

    if (resolve) {
      value = resolve(value)
    }

    this.resolve(value)
  }
}
