import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-home',
    templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
    products: Array<Product> = [];
    error;

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
      this.productService.getAll().subscribe(
        products => {
          this.products = products
          console.log(this.products);
        },
        error => alert(error),
        () => console.log('Request completed')
        );
    }
}

