'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var Async = require('@watch-state/async');
var decorators = require('@watch-state/decorators');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Async__default = /*#__PURE__*/_interopDefaultLegacy(Async);

var index = (() => {
    var _Fetch_instances, _a, _Fetch_response_accessor_storage, _Fetch_response_get, _Fetch_response_set;
    let _instanceExtraInitializers = [];
    let _private_response_decorators;
    let _private_response_initializers = [];
    let _private_response_descriptor;
    let _resolve_decorators;
    return _a = class Fetch extends Async__default["default"] {
            get response() {
                return tslib.__classPrivateFieldGet(this, _Fetch_instances, "a", _Fetch_response_get);
            }
            constructor(url, options = {}) {
                super(() => fetch(url, options).then(response => {
                    this._response = response;
                    return response.status === 204 ? undefined : response[options.type || 'json']();
                }), options.defaultValue);
                _Fetch_instances.add(this);
                _Fetch_response_accessor_storage.set(this, (tslib.__runInitializers(this, _instanceExtraInitializers), tslib.__runInitializers(this, _private_response_initializers, void 0)));
            }
            resolve(value) {
                tslib.__classPrivateFieldSet(this, _Fetch_instances, this._response, "a", _Fetch_response_set);
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
            _private_response_decorators = [decorators.state];
            _resolve_decorators = [decorators.event];
            tslib.__esDecorate(_a, _private_response_descriptor = { get: tslib.__setFunctionName(function () { return tslib.__classPrivateFieldGet(this, _Fetch_response_accessor_storage, "f"); }, "#response", "get"), set: tslib.__setFunctionName(function (value) { tslib.__classPrivateFieldSet(this, _Fetch_response_accessor_storage, value, "f"); }, "#response", "set") }, _private_response_decorators, { kind: "accessor", name: "#response", static: false, private: true, access: { has: obj => tslib.__classPrivateFieldIn(_Fetch_instances, obj), get: obj => tslib.__classPrivateFieldGet(obj, _Fetch_instances, "a", _Fetch_response_get), set: (obj, value) => { tslib.__classPrivateFieldSet(obj, _Fetch_instances, value, "a", _Fetch_response_set); } } }, _private_response_initializers, _instanceExtraInitializers);
            tslib.__esDecorate(_a, null, _resolve_decorators, { kind: "method", name: "resolve", static: false, private: false, access: { has: obj => "resolve" in obj, get: obj => obj.resolve } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();

exports["default"] = index;
