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
import { WarehouseProductService } from './services/warehouse-product.service';
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
import { ProductService } from './services/product.service';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { WarehouseProductComponent } from './warehouse-product/warehouse-product.component';
import { AddWarehouseProductComponent } from './add-warehouse-product/add-warehouse-product.component';
import { RemoveWarehouseProductComponent } from './remove-warehouse-product/remove-warehouse-product.component';
import { MovementService } from './services/movement.service';
import { MovementComponent } from './movement/movement.component';

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
        DeleteCategoryComponent,
        ProductComponent,
        AddProductComponent,
        EditProductComponent,
        DeleteProductComponent,
        WarehouseProductComponent,
        AddWarehouseProductComponent,
        RemoveWarehouseProductComponent,
        MovementComponent
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
            { path: 'delete-category/:id', component: DeleteCategoryComponent },
            { path: 'product', component: ProductComponent },
            { path: 'add-product', component: AddProductComponent },
            { path: 'edit-product/:id', component: EditProductComponent },
            { path: 'delete-product/:id', component: DeleteProductComponent },
            { path: 'warehouse-product/:id', component: WarehouseProductComponent },
            { path: 'add-warehouse-product/:id', component: AddWarehouseProductComponent },
            { path: 'remove-warehouse-product/:id', component: RemoveWarehouseProductComponent },
            { path: 'movement', component: MovementComponent }
        ]),
        ToastrModule.forRoot()
    ],

    providers: [WarehouseService, ProvinceService, MunicipalityService, NeighborhoodService, CategoryService, ProductService, WarehouseProductService, MovementService],
    bootstrap: [AppComponent]
})
export class AppModule { }
