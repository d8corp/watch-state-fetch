'use strict';

var tslib = require('tslib');
var Async = require('@watch-state/async');
var watchState = require('watch-state');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Async__default = /*#__PURE__*/_interopDefaultLegacy(Async);

var Fetch = /** @class */ (function (_super) {
    tslib.__extends(Fetch, _super);
    function Fetch(url, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, tslib.__assign(tslib.__assign({}, options), { request: function (resolve, reject) {
                var _a = options.type, type = _a === void 0 ? 'json' : _a;
                var answer;
                fetch(url, options).then(function (data) {
                    answer = data;
                    return data[type]();
                }).then(function (data) {
                    watchState.globalEvent.start();
                    _this.answer = answer;
                    answer.status > 399 ? reject(data) : resolve(data);
                    watchState.globalEvent.end();
                }, function (e) {
                    watchState.globalEvent.start();
                    _this.answer = answer;
                    reject(e);
                    watchState.globalEvent.end();
                });
            } })) || this;
        _this._answer = new watchState.State();
        return _this;
    }
    Object.defineProperty(Fetch.prototype, "answer", {
        get: function () {
            return this._answer.value;
        },
        set: function (value) {
            this._answer.value = value;
        },
        enumerable: false,
        configurable: true
    });
    return Fetch;
}(Async__default['default']));

module.exports = Fetch;
