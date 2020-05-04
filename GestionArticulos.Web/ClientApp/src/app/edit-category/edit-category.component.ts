import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Category } from "../models/category.model";
import { CategoryService } from "../services/category.service";

@Component({
  selector: 'app-home',
  templateUrl: './edit-category.component.html',
})

export class EditCategoryComponent {
  categoryForm: Category;
  category: Category;
  editCategoryForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.categoryForm = new Category();
    this.category = new Category();
  }

  ngOnInit() {
    this.createForm();
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getById(id).subscribe(category => {
      this.category = category;
      this.categoryForm.description = category.description;
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  private createForm() {
    this.editCategoryForm = this.formBuilder.group({
      'description': [
        '',
        Validators.compose([
          Validators.required, Validators.minLength(3), Validators.maxLength(50)
        ])
      ]
    });
  }

  onSubmit() {
    this.update();
  }

  update() {
    this.setValues();
    this.categoryService.update(this.category).subscribe(
      _ => {
        this.toastr.success(`Categoría: ${this.category.description} editada sastifactoriamente.`, 'Información');
        this.router.navigate(['/category']);
      },
      errResponse => this.toastr.error('Ocurrió un error tratando de editar la categoría. Razón: ' + errResponse.error.error, 'Información')
    );
  }

  private setValues() {
    this.category.description = this.categoryForm.description;
  }
}
