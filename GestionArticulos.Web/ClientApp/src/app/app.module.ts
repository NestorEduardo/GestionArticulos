import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { AddWarehouseComponent } from './add-warehouse/add-warehouse.component';
import { WarehouseService } from './services/warehouse.service';
import { ProvinceService } from './services/province.service';
import { MunicipalityService } from './services/municipality.service';
import { NeighborhoodService } from './services/neighborhood.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    WarehouseComponent,
    AddWarehouseComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'warehouse', component: WarehouseComponent },
      { path: 'add-warehouse', component: AddWarehouseComponent },
    ]),
    ToastrModule.forRoot()
  ],

  providers: [WarehouseService, ProvinceService, MunicipalityService, NeighborhoodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
