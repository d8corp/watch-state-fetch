import Async from '@watch-state/async';
import { globalEvent, State } from 'watch-state';

class Fetch extends Async {
    constructor(url, options = {}, update) {
        super(Object.assign(Object.assign({}, options), { request: (resolve, reject) => {
                const { type = 'json' } = options;
                let answer;
                fetch(url, options).then(data => {
                    answer = data;
                    return data.status === 204 ? undefined : data[type]();
                }).then(data => {
                    globalEvent.start();
                    this.answer = answer;
                    answer.status > 399 ? reject(data) : resolve(data);
                    globalEvent.end();
                }, e => {
                    globalEvent.start();
                    this.answer = answer;
                    reject(e);
                    globalEvent.end();
                });
            } }), update);
        this._answer = new State();
    }
    get answer() {
        return this._answer.value;
    }
    set answer(value) {
        this._answer.value = value;
    }
}

export { Fetch as default };
