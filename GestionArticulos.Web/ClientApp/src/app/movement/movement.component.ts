import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../models/warehouse.model';
import { MovementService } from '../services/movement.service';
import { Movement } from '../models/movement.model';

@Component({
    selector: 'app-home',
    templateUrl: './movement.component.html',
})
export class MovementComponent implements OnInit {
    movements: Array<Movement> = [];
    error;

    constructor(private movementService: MovementService) {
    }

    ngOnInit() {
        this.movementService.getAll().subscribe(
            movements => {
                this.movements = movements
                console.log(this.movements);
            },
            error => alert(error),
            () => console.log('Request completed')
        );
    }
}

