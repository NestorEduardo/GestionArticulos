import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Municipality } from "../models/municipality.model";

@Injectable()
export class MunicipalityService {
  municipalitiesSubject: Subject<Array<Municipality>>;

  constructor(private httpClient: HttpClient) {
    this.municipalitiesSubject = new BehaviorSubject<Array<Municipality>>([]);
  }
  public getByProvinceId(provinceId: number) {
    this._getByProvinceId(provinceId);
    return this.municipalitiesSubject.asObservable();
  }

  private _getByProvinceId(provinceId: number) {
    return this.httpClient.get<Array<Municipality>>(`api/Municipality/GetByProvinceId/${provinceId}`)
      .subscribe(municipalities => this.municipalitiesSubject.next(municipalities), error => this.municipalitiesSubject.error(error));
  }
}
