"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var WarehouseService = /** @class */ (function () {
    function WarehouseService(httpClient) {
        this.httpClient = httpClient;
        this.warehouses = new rxjs_1.BehaviorSubject([]);
    }
    WarehouseService.prototype.getAll = function () {
        this._getAll();
        return this.warehouses.asObservable();
    };
    WarehouseService.prototype._getAll = function () {
        var _this = this;
        return this.httpClient.get("api/feeds/entries")
            .subscribe(function (entries) { return _this.warehouses.next(entries); }, function (error) { return _this.warehouses.error(error); });
    };
    return WarehouseService;
}());
exports.WarehouseService = WarehouseService;
//# sourceMappingURL=warehouse.service.js.map