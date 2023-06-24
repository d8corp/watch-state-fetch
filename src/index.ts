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
  #responseTemp: Response
  get response () {
    return this.#response
  }

  constructor (url: RequestInfo | URL, protected options: FetchOptions<V, E> = {}) {
    super(() => fetch(url, options).then(response => {
      this.#responseTemp = response
      const { type = 'json' } = options

      if (!response.ok) {
        return new Promise((resolve, reject) => response[type]().then(reject, reject))
      }

      return response.status === 204 ? undefined : response[type]()
    }), options.defaultValue)
  }

  @event protected resolve (value: V) {
    this.#response = this.#responseTemp
    const { resolve } = this.options

    if (resolve) {
      value = resolve(value)
    }

    super.resolve(value)
  }

  @event protected reject (error: E) {
    this.#response = this.#responseTemp
    const { reject } = this.options

    if (reject) {
      error = reject(error)
    }

    super.reject(error)
  }
}
