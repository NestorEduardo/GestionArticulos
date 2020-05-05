import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Product } from "../models/Product.model";
import { ProductService } from "../services/product.service";
import { CategoryService } from "../services/category.service";

@Component({
  selector: 'app-home',
  templateUrl: './delete-product.component.html',
})

export class DeleteProductComponent {
  productForm: Product;
  product: Product;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private productService: ProductService, private toastr: ToastrService) {
    this.productForm = new Product();
    this.product = new Product();
  }

  ngOnInit() {
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
    this.delete();
  }

  delete() {
    this.setValues();
    this.productService.delete(this.product).subscribe(
      _ => {
        this.toastr.success(`Artículo: ${this.product.description} eliminado sastifactoriamente.`, 'Información');
        this.router.navigate(['/product']);
      },
      errResponse => this.toastr.error('Ocurrió un error tratando de eliminar un artículo. Razón: ' + errResponse.error.error, 'Información')
    );
  }

  private setValues() {
    this.product.description = this.productForm.description;
    this.product.price = this.productForm.price;
    this.product.categoryId = this.productForm.categoryId;
  }
}
