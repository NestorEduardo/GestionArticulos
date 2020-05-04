import { HttpClient } from "@angular/common/http";
import { Product } from "../models/Product.model";
import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductService {
  productsSubject: Subject<Array<Product>>;
  
  constructor(private httpClient: HttpClient) {
    this.productsSubject = new BehaviorSubject<Array<Product>>([]);
  }

  public getAll() {
    this._getAll();
    return this.productsSubject.asObservable();
  }
  
  public create(Product: Product) {
    return this._create(Product);
  }
  
  public update(Product: Product) {
    return this._update(Product);
  }
  
  public getById(id: number) {
    return this._getById(id);
  }

  private _getAll() {
    return this.httpClient.get<Array<Product>>("api/Product/GetAll")
      .subscribe(Products => this.productsSubject.next(Products), error => this.productsSubject.error(error));
  }

  private _create(Product: Product) {
    return this.httpClient.post('api/Product/Add', Product);
  }

  private _update(Product: Product) {
    return this.httpClient.post('api/Product/Update', Product);
  }

  private _getById(id: number) {
    return this.httpClient.get<Product>(`api/Product/GetById/${id}`);
  }

  public delete(Product: Product) {
    return this.httpClient.post('api/Product/Delete', Product);
  }
}
