import { HttpClient } from "@angular/common/http";
import { Warehouse } from "../models/warehouse.model";
import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';


@Injectable()
export class WarehouseService {
    warehouses: Array<Warehouse>;

    constructor(private httpClient: HttpClient) { }
    public getAll() {
        this._getAll();
        return this.warehouses;
    }

    private _getAll() {
        this.httpClient.get<Array<Warehouse>>(`api/Warehouse/GetAll`).pipe(map(data => { this.warehouses = data; })).subscribe();
    }
}
