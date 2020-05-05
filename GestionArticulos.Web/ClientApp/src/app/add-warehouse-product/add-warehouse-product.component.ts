import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../models/warehouse.model';
import { WarehouseProductService } from '../services/warehouse-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddWarehouseProduct } from '../models/add-warehouse-product.model';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-home',
    templateUrl: './add-warehouse-product.component.html',
})

export class AddWarehouseProductComponent implements OnInit {
    warehouseProduct: AddWarehouseProduct;
    warehouseProductForm: AddWarehouseProduct;
    warehouse: Warehouse;
    id: number;
    addWarehouseProductForm: FormGroup;
    remainingCapacity: number;

    constructor(private warehouseService: WarehouseService, private route: ActivatedRoute, private formBuilder: FormBuilder, private productService: ProductService, private warehouseProductService: WarehouseProductService, private toastr: ToastrService, private router: Router) {
        this.warehouseProduct = new AddWarehouseProduct();
        this.warehouseProductForm = new AddWarehouseProduct();
        this.warehouse = new Warehouse();
    }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getRemainingCapacity();
        this.createForm();
        this.getProducts();
        this.getWarehouse();

    }

    private getProducts() {
        this.productService.getAll().subscribe(
            products => {
                this.warehouseProductForm.products = products;
                this.warehouseProductForm.productId = 0;
            },
            error => alert(error),
            () => console.log('Request completed')
        );
    }

    private getRemainingCapacity() {
        this.warehouseProductService.getRemainingCapacityByWarehouseId(this.id).subscribe(
            remainingCapacity => {
                this.remainingCapacity = remainingCapacity;
                console.log('remaining', this.remainingCapacity);
            },
            error => alert(error),
            () => console.log('Request completed')
        );
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

    private createForm() {
        this.addWarehouseProductForm = this.formBuilder.group({
            'count': [
                '',
                Validators.compose([
                    Validators.required, Validators.min(1), Validators.max(this.remainingCapacity)
                ])
            ],
            'product': [
                '',
                Validators.compose([
                    Validators.required, Validators.min(1), Validators.max(1000000)
                ])
            ]
        });




    }

    onSubmit() {
        if (this.warehouseProductForm.count > this.remainingCapacity) {
            this.toastr.error(`El campo cantidad supera la capacidad restante el almacén: ${this.remainingCapacity}. ` , 'Información')
        } else {
            this.addWarehouseProduct();
        }
    }

    private addWarehouseProduct() {
        this.setValues();
        this.warehouseProductService.addWarehouseProduct(this.warehouseProduct).subscribe(
            _ => {
                this.toastr.success(`Producto agregado sastifactoriamente.`, 'Información');
                this.router.navigate([`/warehouse-product/${this.id}`]);
            },
            errResponse => this.toastr.error('Ocurrió un error agregar el producto. Razón: ' + errResponse.error.error, 'Información')
        );
    }

    private setValues() {
        this.warehouseProduct.count = this.warehouseProductForm.count;
        this.warehouseProduct.productId = this.warehouseProductForm.productId;
        this.warehouseProduct.warehouseId = this.id;
    }
}

