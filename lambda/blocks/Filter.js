"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Filter = /** @class */ (function () {
    function Filter(config) {
        this._limit = config.limit;
    }
    Filter.prototype.limit = function () {
        return this._limit;
    };
    return Filter;
}());
exports.Filter = Filter;
