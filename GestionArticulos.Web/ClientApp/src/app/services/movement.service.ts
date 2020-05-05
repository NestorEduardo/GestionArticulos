import { HttpClient } from "@angular/common/http";
import { Warehouse } from "../models/warehouse.model";
import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Movement } from "../models/movement.model";

@Injectable()
export class MovementService {
    movementsSubject: Subject<Array<Movement>>;
  
  constructor(private httpClient: HttpClient) {
      this.movementsSubject = new BehaviorSubject<Array<Movement>>([]);
  }
    
  public getAll() {
    this._getAll();
      return this.movementsSubject.asObservable();
  }

  private _getAll() {
    return this.httpClient.get<Array<Movement>>("api/Movement/GetAll")
        .subscribe(movements => this.movementsSubject.next(movements), error => this.movementsSubject.error(error));
  }

}
