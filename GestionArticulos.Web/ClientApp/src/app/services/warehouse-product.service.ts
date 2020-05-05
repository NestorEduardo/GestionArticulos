import { HttpClient } from "@angular/common/http";
import { Warehouse } from "../models/warehouse.model";
import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { WarehouseProduct } from "../models/warehouse-product.model";
import { WarehouseProductViewModel } from "../models/warehouse-product.viewmodel";
import { Product } from "../models/product.model";

@Injectable()
export class WarehouseProductService {

  constructor(private httpClient: HttpClient) {
  }

  public getByWarehouseId(id: number) {
    return this._getByWarehouseId(id);
  }

  private _getByWarehouseId(id: number) {
    return this.httpClient.get<WarehouseProductViewModel>(`api/WarehouseProduct/GetByWarehouseId/${id}`);
  }

  public addProduct(warehouse: Warehouse, product: Product, count: number) {
    return this.httpClient.post('api/WarehouseProduct/AddProduct', {
      warehouse, product, count
    });
  }

  public removeProduct(warehouse: Warehouse, product: Product, count: number) {
    return this.httpClient.post('api/WarehouseProduct/RemoveProduct', {
      warehouse, product, count
    });
  }
}
