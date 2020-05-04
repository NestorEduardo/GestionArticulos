import { HttpClient } from "@angular/common/http";
import { Warehouse } from "../models/warehouse.model";
import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class WarehouseService {
  warehousesSubject: Subject<Array<Warehouse>>;
  warehouseSubject: Subject<Warehouse>;

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

  public update(warehouse: Warehouse) {
    return this._update(warehouse);
  }

  public getById(id: number) {
    return this._getById(id);
  }

  private _getAll() {
    return this.httpClient.get<Array<Warehouse>>("api/Warehouse/GetAll")
      .subscribe(warehouses => this.warehousesSubject.next(warehouses), error => this.warehousesSubject.error(error));
  }

  private _create(warehouse: Warehouse) {
    return this.httpClient.post('api/Warehouse/Add', warehouse);
  }

  private _update(warehouse: Warehouse) {
    return this.httpClient.post('api/Warehouse/Update', warehouse);
  }

  private _getById(id: number) {
    return this.httpClient.get<Warehouse>(`api/Warehouse/GetById/${id}`);
  }
}
