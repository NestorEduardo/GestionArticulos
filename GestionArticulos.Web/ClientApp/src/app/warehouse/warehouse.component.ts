import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../models/warehouse.model';

@Component({
  selector: 'app-home',
  templateUrl: './warehouse.component.html',
})
export class WarehouseComponent implements OnInit  {
  warehouses: Array<Warehouse> = [];
  error;

  constructor(private warehouseService: WarehouseService) {
  }
  
  ngOnInit() {
    this.warehouseService.getAll().subscribe(
      warehouses => {
        this.warehouses = warehouses
      },
      error => alert(error),
      () => console.log('Request completed')
    );
  }
}

