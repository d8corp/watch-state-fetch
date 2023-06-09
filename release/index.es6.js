import { __classPrivateFieldGet, __runInitializers, __classPrivateFieldSet, __esDecorate, __setFunctionName, __classPrivateFieldIn } from 'tslib';
import Async from '@watch-state/async';
import { state, event } from '@watch-state/decorators';

var index = (() => {
    var _Fetch_instances, _a, _Fetch_response_accessor_storage, _Fetch_response_get, _Fetch_response_set;
    let _instanceExtraInitializers = [];
    let _private_response_decorators;
    let _private_response_initializers = [];
    let _private_response_descriptor;
    let _resolve_decorators;
    return _a = class Fetch extends Async {
            get response() {
                return __classPrivateFieldGet(this, _Fetch_instances, "a", _Fetch_response_get);
            }
            constructor(url, options = {}) {
                super(() => fetch(url, options).then(response => {
                    this._response = response;
                    return response.status === 204 ? undefined : response[options.type || 'json']();
                }), options.defaultValue);
                _Fetch_instances.add(this);
                _Fetch_response_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _private_response_initializers, void 0)));
            }
            resolve(value) {
                __classPrivateFieldSet(this, _Fetch_instances, this._response, "a", _Fetch_response_set);
                if (this._response.status > 399) {
                    return super.reject(value);
                }
                return super.resolve(value);
            }
        },
        _Fetch_response_accessor_storage = new WeakMap(),
        _Fetch_instances = new WeakSet(),
        _Fetch_response_get = function _Fetch_response_get() { return _private_response_descriptor.get.call(this); },
        _Fetch_response_set = function _Fetch_response_set(value) { return _private_response_descriptor.set.call(this, value); },
        (() => {
            _private_response_decorators = [state];
            _resolve_decorators = [event];
            __esDecorate(_a, _private_response_descriptor = { get: __setFunctionName(function () { return __classPrivateFieldGet(this, _Fetch_response_accessor_storage, "f"); }, "#response", "get"), set: __setFunctionName(function (value) { __classPrivateFieldSet(this, _Fetch_response_accessor_storage, value, "f"); }, "#response", "set") }, _private_response_decorators, { kind: "accessor", name: "#response", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_Fetch_instances, obj), get: obj => __classPrivateFieldGet(obj, _Fetch_instances, "a", _Fetch_response_get), set: (obj, value) => { __classPrivateFieldSet(obj, _Fetch_instances, value, "a", _Fetch_response_set); } } }, _private_response_initializers, _instanceExtraInitializers);
            __esDecorate(_a, null, _resolve_decorators, { kind: "method", name: "resolve", static: false, private: false, access: { has: obj => "resolve" in obj, get: obj => obj.resolve } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();

export { index as default };
