import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../models/warehouse.model';
import { WarehouseProductService } from '../services/warehouse-product.service';
import { WarehouseProduct } from '../models/warehouse-product.model';
import { ActivatedRoute } from '@angular/router';
import { WarehouseProductViewModel } from '../models/warehouse-product.viewmodel';

@Component({
  selector: 'app-home',
  templateUrl: './warehouse-product.component.html',
})
export class WarehouseProductComponent implements OnInit  {
  warehouseProductsViewModel: WarehouseProductViewModel;
  warehouse: Warehouse;
  error;
  id: number;
  constructor(private warehouseProductService: WarehouseProductService, private warehouseService: WarehouseService, private route: ActivatedRoute) {
    this.warehouseProductsViewModel = new WarehouseProductViewModel();
    this.warehouse = new Warehouse();
  }
  
    ngOnInit() {
     this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.warehouseProductService.getByWarehouseId(this.id).subscribe(
      warehouseProducts => {
        this.warehouseProductsViewModel = warehouseProducts
        console.log(this.warehouseProductsViewModel);
      },
      error => alert(error),
      () => console.log('Request completed')
    );

    this.getWarehouse();
  }

  private getWarehouse() {
    this.warehouseService.getById(this.id).subscribe(
      warehouse => {
        this.warehouse = warehouse
      },
      error => alert(error),
      () => console.log('Request completed')
    );
  }
}

