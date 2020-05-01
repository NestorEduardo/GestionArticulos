import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { ActivatedRoute } from '@angular/router';
import { Warehouse } from '../models/warehouse.model';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './warehouse.component.html',
})
export class WarehouseComponent {
    warehouses: Array<Warehouse> = [];
    constructor(private warehouseService: WarehouseService, private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.get();
    }

    get() {
        var x = this.warehouseService.getAll();
        console.log(x);
    }
}
