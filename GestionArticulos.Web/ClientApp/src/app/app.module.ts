import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { AddWarehouseComponent } from './add-warehouse/add-warehouse.component';
import { WarehouseService } from './services/warehouse.service';
import { CategoryService } from './services/category.service';
import { ProvinceService } from './services/province.service';
import { MunicipalityService } from './services/municipality.service';
import { NeighborhoodService } from './services/neighborhood.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditWarehouseComponent } from './edit-warehouse/edit-warehouse.component';
import { DeleteWarehouseComponent } from './delete-warehouse/delete-warehouse.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    WarehouseComponent,
    AddWarehouseComponent,
    EditWarehouseComponent,
    DeleteWarehouseComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'warehouse', component: WarehouseComponent },
      { path: 'add-warehouse', component: AddWarehouseComponent },
      { path: 'edit-warehouse/:id', component: EditWarehouseComponent },
      { path: 'delete-warehouse/:id', component: DeleteWarehouseComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'edit-category/:id', component: EditCategoryComponent },
      { path: 'delete-category/:id', component: DeleteCategoryComponent }
    ]),
    ToastrModule.forRoot()
  ],

  providers: [WarehouseService, ProvinceService, MunicipalityService, NeighborhoodService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
