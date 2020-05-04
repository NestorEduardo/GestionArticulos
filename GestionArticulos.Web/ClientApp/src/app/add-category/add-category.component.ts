import { Component, OnInit } from '@angular/core';
import { WarehouseForm } from '../models/warehouse-form.model';
import { Warehouse } from '../models/warehouse.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './add-category.component.html',
})

export class AddCategoryComponent implements OnInit {
  categoryForm: WarehouseForm;
  category: Warehouse;
  addCategoryForm: FormGroup;

  constructor(private toastr: ToastrService, private router: Router, private formBuilder: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = new WarehouseForm();
    this.category = new Warehouse();
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.addCategoryForm = this.formBuilder.group({
      'description': [
        '',
        Validators.compose([
          Validators.required, Validators.minLength(3), Validators.maxLength(50)
        ])
      ]
    });
  }

  private setValues() {
    this.category.description = this.categoryForm.description;
  }

  create() {
    this.setValues();
    this.categoryService.create(this.category).subscribe(
      _ => {
        this.toastr.success(`Categoría: ${this.category.description} creada sastifactoriamente.`, 'Información');
        this.router.navigate(['/category']);
      },
      errResponse => this.toastr.error('Ocurrió un error tratando de crear la categoría. Razón: ' + errResponse.error.error, 'Información')
    );
  }

  onSubmit() {
    this.create();
  }
}
