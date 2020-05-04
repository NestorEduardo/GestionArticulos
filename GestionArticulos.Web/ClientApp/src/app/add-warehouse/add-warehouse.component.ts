import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { ProvinceService } from '../services/province.service';
import { WarehouseForm } from '../models/warehouse-form.model';
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
  warehouseForm: WarehouseForm;
  warehouse: Warehouse;
  addWarehouseForm: FormGroup;

  constructor(private provinceService: ProvinceService, private municipalityService: MunicipalityService, private neighborhoodService: NeighborhoodService, private warehouseService: WarehouseService,
    private toastr: ToastrService, private router: Router, private formBuilder: FormBuilder) {

    this.warehouseForm = new WarehouseForm();
    this.warehouse = new Warehouse();
  }

  ngOnInit() {
    this.createForm();
    this.provinceService.getAll().subscribe(provinces => {
      this.warehouseForm.provinces = provinces;
      this.warehouseForm.provinceId = 0;
      this.warehouseForm.municipalityId = 0;
      this.warehouseForm.neighborhoodId = 0;

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
    this.warehouse.address = this.warehouseForm.address;
    this.warehouse.capacity = this.warehouseForm.capacity;
    this.warehouse.description = this.warehouseForm.description;
    this.warehouse.neighborhoodId = this.warehouseForm.neighborhoodId;
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
      this.warehouseForm.municipalities = municipalities;
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  onMunicipalityChange(municipalityId: number) {
    this.neighborhoodService.getByMunicipalityId(municipalityId).subscribe(neighborhoods => {
      this.warehouseForm.neighborhoods = neighborhoods;
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  onSubmit() {
    this.create();
  }
}
