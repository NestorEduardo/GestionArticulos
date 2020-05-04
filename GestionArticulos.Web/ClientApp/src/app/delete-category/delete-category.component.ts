import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Category } from "../models/category.model";
import { CategoryService } from "../services/category.service";

@Component({
  selector: 'app-home',
  templateUrl: './delete-category.component.html',
})

export class DeleteCategoryComponent {
  categoryForm: Category;
  category: Category;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private toastr: ToastrService) {
    this.categoryForm = new Category();
    this.category = new Category();
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getById(id).subscribe(category => {
      this.category = category;
      this.categoryForm.description = category.description;
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
    this.categoryService.delete(this.category).subscribe(
      _ => {
        this.toastr.success(`Categoría: ${this.category.description} eliminada sastifactoriamente.`, 'Información');
        this.router.navigate(['/category']);
      },
      errResponse => this.toastr.error('Ocurrió un error tratando de eliminar la categoría. Razón: ' + errResponse.error.error, 'Información')
    );
  }

  private setValues() {
    this.category.description = this.categoryForm.description;
  }
}
