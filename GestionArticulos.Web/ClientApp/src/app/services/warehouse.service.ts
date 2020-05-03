import { HttpClient } from "@angular/common/http";
import { Warehouse, Test } from "../models/warehouse.model";
import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class WarehouseService {
  warehousesSubject: Subject<Array<Warehouse>>;

  constructor(private httpClient: HttpClient) {
    this.warehousesSubject = new BehaviorSubject<Array<Warehouse>>([]);
  }

  public getAll() {
    this._getAll();
    return this.warehousesSubject.asObservable();
  }

  public create(warehouse: Warehouse) {
    return this._create(warehouse);
  }

  private _getAll() {
    return this.httpClient.get<Array<Warehouse>>("api/Warehouse/GetAll")
      .subscribe(warehouses => this.warehousesSubject.next(warehouses), error => this.warehousesSubject.error(error));
  }

  private _create(warehouse: Warehouse) {
    return this.httpClient.post('api/Warehouse/Add', warehouse);
  }
}
