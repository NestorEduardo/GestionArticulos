import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Province } from "../models/province.model";

@Injectable()
export class ProvinceService {
  provincesSubject: Subject<Array<Province>>;

  constructor(private httpClient: HttpClient) {
    this.provincesSubject = new BehaviorSubject<Array<Province>>([]);
  }

  public getAll() {
    this._getAll();
    return this.provincesSubject.asObservable();
  }

  private _getAll() {
    return this.httpClient.get<Array<Province>>("api/Province/GetAll")
      .subscribe(provinces => this.provincesSubject.next(provinces), error => this.provincesSubject.error(error));
  }
}
