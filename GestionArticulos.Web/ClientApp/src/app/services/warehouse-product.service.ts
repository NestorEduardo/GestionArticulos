import { HttpClient } from "@angular/common/http";
import { Warehouse } from "../models/warehouse.model";
import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { WarehouseProduct } from "../models/warehouse-product.model";
import { WarehouseProductViewModel } from "../models/warehouse-product.viewmodel";
import { Product } from "../models/product.model";
import { AddWarehouseProduct } from "../models/add-warehouse-product.model";

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

    public addWarehouseProduct(addWarehouseProduct: AddWarehouseProduct) {
        return this.httpClient.post('api/WarehouseProduct/addWarehouseProduct', addWarehouseProduct);
  }

    public removeWarehouseProduct(removeWarehouseProduct: AddWarehouseProduct) {
        return this.httpClient.post('api/WarehouseProduct/RemoveProduct', removeWarehouseProduct);
    }

    public getRemainingCapacityByWarehouseId(id: number) {
        return this.httpClient.get<number>(`api/WarehouseProduct/GetRemainingCapacityByWarehouse/${id}`);
    }

    public getProductCountByWarehouse(warehouseId:number, productId:number) {
        return this.httpClient.get<number>(`api/WarehouseProduct/GetProductCountByWarehouse/${warehouseId}/${productId}`);
    }
}
