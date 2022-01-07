import Async from '@watch-state/async';
import { globalEvent, State } from 'watch-state';

class Fetch extends Async {
    constructor(url, options = {}) {
        super(Object.assign(Object.assign({}, options), { request: (resolve, reject) => {
                const { type = 'json' } = options;
                let answer;
                fetch(url, options).then(data => {
                    answer = data;
                    return data[type]();
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
            } }));
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
