import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit  {
  categories: Array<Category> = [];

  constructor(private categoriesService: CategoryService) {
  }
  
  ngOnInit() {
    this.categoriesService.getAll().subscribe(
      categories => {
        this.categories = categories
      },
      error => alert(error),
      () => console.log('Request completed')
    );
  }
}

