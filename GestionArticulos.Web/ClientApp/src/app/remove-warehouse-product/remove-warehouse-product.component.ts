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
    templateUrl: './remove-warehouse-product.component.html',
})

export class RemoveWarehouseProductComponent implements OnInit {
    warehouseProduct: AddWarehouseProduct;
    warehouseProductForm: AddWarehouseProduct;
    warehouse: Warehouse;
    id: number;
    addWarehouseProductForm: FormGroup;
    remainingCapacity: number;
    productCount: number;
    canSave: boolean;

    constructor(private warehouseService: WarehouseService, private route: ActivatedRoute, private formBuilder: FormBuilder, private productService: ProductService, private warehouseProductService: WarehouseProductService, private toastr: ToastrService, private router: Router) {
        this.warehouseProduct = new AddWarehouseProduct();
        this.warehouseProductForm = new AddWarehouseProduct();
        this.warehouse = new Warehouse();
    }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getProducts();
        this.getWarehouse();
        this.createForm();
    }

    private getProducts() {
        this.warehouseProductService.getByWarehouseId(this.id).subscribe(
            warehouseProducts => {
                this.warehouseProductForm.products = warehouseProducts.warehouseProducts;
                this.warehouseProductForm.productId = 0;
                console.log(warehouseProducts.warehouseProducts);
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
                    Validators.required
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
        this.getProductCountByWarehouse();
    }

    private removeWarehouseProduct() {
        this.setValues();
        this.warehouseProductService.removeWarehouseProduct(this.warehouseProduct).subscribe(
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

    private getProductCountByWarehouse() {
        this.warehouseProductService.getProductCountByWarehouse(this.id, this.warehouseProductForm.productId).subscribe(
            productCount => {
                this.productCount = productCount

                if (this.productCount < this.warehouseProductForm.count) {
                    this.toastr.error(`El producto que intenta dar salida solo cuenta con ${this.productCount} existencia(s), debe dar salida a igual cantidad o menos.`, 'Información');
                } else {
                    this.removeWarehouseProduct();
                }
            },
            error => alert(error),
            () => console.log('Request completed')
        );
    }
}

