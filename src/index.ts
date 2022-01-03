import Async, { IAsyncOptions } from '@watch-state/async'
import { State, globalEvent } from 'watch-state'

export interface FetchOptions extends RequestInit, Omit<IAsyncOptions, 'request'> {
  type?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'
}

export default class Fetch<V = any, E = any> extends Async<V, E> {
  _answer = new State()
  get answer () {
    return this._answer.value
  }
  set answer (value) {
    this._answer.value = value
  }

  constructor (url: string, options: FetchOptions = {}) {
    super({...options, request: (resolve, reject) => {
      const { type = 'json' } = options
      let answer
      fetch(url, options).then(data => {
        answer = data
        return data[type]()
      }).then(data => {
        globalEvent.start()
        this.answer = answer
        answer.status > 399 ? reject(data) : resolve(data)
        globalEvent.end()
      }, e => {
        globalEvent.start()
        this.answer = answer
        reject(e)
        globalEvent.end()
      })
    }})
  }
}
