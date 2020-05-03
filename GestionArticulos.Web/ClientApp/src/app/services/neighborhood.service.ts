import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Neighborhood } from "../models/neighborhood.model";

@Injectable()
export class NeighborhoodService {
  neighborhoodSubject: Subject<Array<Neighborhood>>;

  constructor(private httpClient: HttpClient) {
    this.neighborhoodSubject = new BehaviorSubject<Array<Neighborhood>>([]);
  }
  public getByMunicipalityId(provinceId: number) {
    this._getByMunicipalityId(provinceId);
    return this.neighborhoodSubject.asObservable();
  }

  private _getByMunicipalityId(municipalityId: number) {
    return this.httpClient.get<Array<Neighborhood>>(`api/Neighborhood/GetByMunicipalityId/${municipalityId}`)
      .subscribe(neighborhoods => this.neighborhoodSubject.next(neighborhoods), error => this.neighborhoodSubject.error(error));
  }
}
