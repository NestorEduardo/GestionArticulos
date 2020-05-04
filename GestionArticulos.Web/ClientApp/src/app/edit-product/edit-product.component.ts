import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Product } from "../models/Product.model";
import { ProductService } from "../services/product.service";
import { CategoryService } from "../services/category.service";

@Component({
  selector: 'app-home',
  templateUrl: './edit-product.component.html',
})

export class EditProductComponent {
  productForm: Product;
  product: Product;
  editProductForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private formBuilder: FormBuilder, private toastr: ToastrService,
    private categoryService: CategoryService) {

    this.productForm = new Product();
    this.product = new Product();
  }

  ngOnInit() {
    this.createForm();
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(id).subscribe(product => {
      this.product = product;
      this.productForm.description = product.description;
      this.productForm.price = product.price;
      this.productForm.categoryId = product.categoryId;
      this.getCategories();
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  private createForm() {
    this.editProductForm = this.formBuilder.group({
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

  private getCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.productForm.categories = categories;
      this.productForm.categoryId = this.product.categoryId;
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  onSubmit() {
    this.update();
  }

  update() {
    this.setValues();
    this.productService.update(this.product).subscribe(
      _ => {
        this.toastr.success(`Artículo: ${this.product.description} editado sastifactoriamente.`, 'Información');
        this.router.navigate(['/product']);
      },
      errResponse => this.toastr.error('Ocurrió un error tratando de editar el artículo. Razón: ' + errResponse.error.error, 'Información')
    );
  }

  private setValues() {
    this.product.description = this.productForm.description;
    this.product.price = this.productForm.price;
    this.product.categoryId = this.productForm.categoryId;
  }
}
