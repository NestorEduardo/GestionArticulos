import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { ActivatedRoute } from '@angular/router';
import { Warehouse } from '../models/warehouse.model';

@Component({
  selector: 'app-home',
  templateUrl: './warehouse.component.html',
})
export class WarehouseComponent implements OnInit  {
  warehouses: Array<Warehouse> = [];
  error;
  constructor(private warehouseService: WarehouseService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.warehouseService.getAll().subscribe(
      data => {
        this.warehouses = data
      
        
      },
      error => alert(error),
      () => console.log('Request completed')
    );
    console.log(this.warehouses);
  }
}



