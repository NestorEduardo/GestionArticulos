import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";
import { error } from "protractor";

@Injectable()
export class  CategoryService {
  categoriesSubject: Subject<Array<Category>>;
  
  constructor(private httpClient: HttpClient) {
    this.categoriesSubject = new BehaviorSubject<Array<Category>>([]);
  }

  public getAll() {
    this._getAll();
    return this.categoriesSubject.asObservable();
  }

  public create(category: Category) {
    return this._create(category);
  }

  public update(category: Category) {
    return this._update(category);
  }
  
  public getById(id: number) {
    return this._getById(id);
  }

  private _getAll() {
    debugger;
    return this.httpClient.get<Array<Category>>("api/Category/GetAll")
      .subscribe(categories => this.categoriesSubject.next(categories), error => this.categoriesSubject.error(error)    );
  }

  private _create(category: Category) {
    debugger;
    return this.httpClient.post('api/Category/Add', category);
  }

  private _update(category: Category) {
    return this.httpClient.post('api/Category/Update', category);
  }

  private _getById(id: number) {
    return this.httpClient.get<Category>(`api/Category/GetById/${id}`);
  }

  public delete(category: Category) {
    return this.httpClient.post('api/Category/Delete', category);
  }
}
