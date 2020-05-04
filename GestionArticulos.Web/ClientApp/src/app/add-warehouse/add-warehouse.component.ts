import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { ProvinceService } from '../services/province.service';
import { CreateWarehouse } from '../models/create-warehouse.model';
import { MunicipalityService } from '../services/municipality.service';
import { NeighborhoodService } from '../services/neighborhood.service';
import { Warehouse } from '../models/warehouse.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './add-warehouse.component.html',
})

export class AddWarehouseComponent implements OnInit {
  createWarehouse: CreateWarehouse;
  warehouse: Warehouse;
  addWarehouseForm: FormGroup;

  constructor(private provinceService: ProvinceService, private municipalityService: MunicipalityService, private neighborhoodService: NeighborhoodService, private warehouseService: WarehouseService,
    private toastr: ToastrService, private router: Router, private formBuilder: FormBuilder) {
    
    this.createWarehouse = new CreateWarehouse();
    this.warehouse = new Warehouse();
  }

  ngOnInit() {
    this.createForm();
    this.provinceService.getAll().subscribe(provinces => {
      this.createWarehouse.provinces = provinces;
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  private createForm() {
    this.addWarehouseForm = this.formBuilder.group({
      'description': [
        '',
        Validators.compose([
          Validators.required, Validators.minLength(3), Validators.maxLength(50)
        ])
      ],
      'capacity': [
        '',
        Validators.compose([
          Validators.required, Validators.min(1), Validators.max(1000000)
        ])
      ],
      'province': [
        '',
        Validators.compose([
          Validators.min(1)
        ])
      ],
      'municipality': [
        '',
        Validators.compose([
          Validators.min(1)
        ])
      ],
      'neighborhood': [
        '',
        Validators.compose([
          Validators.min(1)
        ])
      ],
      'address': [
        '',
        Validators.compose([
          Validators.required, Validators.minLength(3), Validators.maxLength(200)
        ])
      ],
    });
  }

  private setValues() {
    this.warehouse.address = this.createWarehouse.address;
    this.warehouse.capacity = this.createWarehouse.capacity;
    this.warehouse.description = this.createWarehouse.description;
    this.warehouse.neighborhoodId = this.createWarehouse.neighborhoodId;
  }

  create() {
    this.setValues();
    this.warehouseService.create(this.warehouse).subscribe(
      _ => {
        this.toastr.success(`Almacen: ${this.warehouse.description} creado sastifactoriamente.`, 'Información');
        this.router.navigate(['/warehouse']);
      },
      errResponse => this.toastr.error('Ocurrió un error tratando de crear un almacén. Razón: ' + errResponse.error.error, 'Información')
    );
  }

  onProvincehange(provinceId: number) {
    this.municipalityService.getByProvinceId(provinceId).subscribe(municipalities => {
      this.createWarehouse.municipalities = municipalities;
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  onMunicipalityChange(municipalityId: number) {
    this.neighborhoodService.getByMunicipalityId(municipalityId).subscribe(neighborhoods => {
      this.createWarehouse.neighborhoods = neighborhoods;
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  onSubmit() {
    this.create();
  }
}
