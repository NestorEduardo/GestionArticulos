import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Product } from '../models/Product.model';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './add-product.component.html',
})

export class AddProductComponent implements OnInit {
  productForm: Product;
  product: Product;
  addProductForm: FormGroup;

  constructor(private categoryService: CategoryService, private productService: ProductService, private toastr: ToastrService, private router: Router, private formBuilder: FormBuilder) {
    this.productForm = new Product();
    this.product = new Product();
  }

  ngOnInit() {
    this.createForm();
    this.categoryService.getAll().subscribe(categories => {
      
      this.productForm.categories = categories;
      this.productForm.categoryId = 0;
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  private createForm() {
    this.addProductForm = this.formBuilder.group({
      'description': [
        '',
        Validators.compose([
          Validators.required, Validators.minLength(3), Validators.maxLength(50)
        ])
      ],
      'price': [
        '',
        Validators.compose([
          Validators.required, Validators.min(1), Validators.max(100000000)
        ])
      ],
      'category': [
        '',
        Validators.compose([
          Validators.min(1)
        ])
      ]
    });
  }

  private setValues() {
    this.product.description = this.productForm.description;
    this.product.price = this.productForm.price;
    this.product.categoryId = this.productForm.categoryId;
  }

  create() {
    this.setValues();
    this.productService.create(this.product).subscribe(
      _ => {
        this.toastr.success(`Artículo: ${this.product.description} creado sastifactoriamente.`, 'Información');
        this.router.navigate(['/product']);
      },
      errResponse => this.toastr.error('Ocurrió un error tratando de crear el artículo. Razón: ' + errResponse.error.error, 'Información')
    );
  }

  onSubmit() {
    this.create();
  }
}
