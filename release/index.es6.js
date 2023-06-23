import { __classPrivateFieldGet, __runInitializers, __classPrivateFieldSet, __esDecorate, __setFunctionName, __classPrivateFieldIn } from 'tslib';
import Async from '@watch-state/async';
import { state, event } from '@watch-state/decorators';

var index = (() => {
    var _Fetch_instances, _a, _Fetch_response_accessor_storage, _Fetch_response_get, _Fetch_response_set;
    let _instanceExtraInitializers = [];
    let _private_response_decorators;
    let _private_response_initializers = [];
    let _private_response_descriptor;
    let _asyncResolve_decorators;
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
                this.options = (__runInitializers(this, _instanceExtraInitializers), options);
                _Fetch_response_accessor_storage.set(this, __runInitializers(this, _private_response_initializers, void 0));
            }
            asyncResolve(value) {
                __classPrivateFieldSet(this, _Fetch_instances, this._response, "a", _Fetch_response_set);
                if (this._response.ok) {
                    this.fetchResolve(value);
                }
                else {
                    this.fetchReject(value);
                }
            }
            fetchReject(error) {
                const { reject } = this.options;
                if (reject) {
                    error = reject(error);
                }
                this.reject(error);
            }
            fetchResolve(value) {
                const { resolve } = this.options;
                if (resolve) {
                    value = resolve(value);
                }
                this.resolve(value);
            }
        },
        _Fetch_response_accessor_storage = new WeakMap(),
        _Fetch_instances = new WeakSet(),
        _Fetch_response_get = function _Fetch_response_get() { return _private_response_descriptor.get.call(this); },
        _Fetch_response_set = function _Fetch_response_set(value) { return _private_response_descriptor.set.call(this, value); },
        (() => {
            _private_response_decorators = [state];
            _asyncResolve_decorators = [event];
            __esDecorate(_a, _private_response_descriptor = { get: __setFunctionName(function () { return __classPrivateFieldGet(this, _Fetch_response_accessor_storage, "f"); }, "#response", "get"), set: __setFunctionName(function (value) { __classPrivateFieldSet(this, _Fetch_response_accessor_storage, value, "f"); }, "#response", "set") }, _private_response_decorators, { kind: "accessor", name: "#response", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_Fetch_instances, obj), get: obj => __classPrivateFieldGet(obj, _Fetch_instances, "a", _Fetch_response_get), set: (obj, value) => { __classPrivateFieldSet(obj, _Fetch_instances, value, "a", _Fetch_response_set); } } }, _private_response_initializers, _instanceExtraInitializers);
            __esDecorate(_a, null, _asyncResolve_decorators, { kind: "method", name: "asyncResolve", static: false, private: false, access: { has: obj => "asyncResolve" in obj, get: obj => obj.asyncResolve } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();

export { index as default };
