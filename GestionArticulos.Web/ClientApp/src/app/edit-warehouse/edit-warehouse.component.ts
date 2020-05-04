import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from "../models/warehouse.model";
import { WarehouseForm } from "../models/warehouse-form.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NeighborhoodService } from '../services/neighborhood.service';
import { Neighborhood } from "../models/neighborhood.model";
import { ProvinceService } from "../services/province.service";
import { MunicipalityService } from "../services/municipality.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './edit-warehouse.component.html',
})

export class EditWarehouseComponent {
  warehouseForm: WarehouseForm;
  warehouse: Warehouse;
  editWarehouseForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private provinceService: ProvinceService, private municipalityService: MunicipalityService, private warehouseService: WarehouseService, private formBuilder: FormBuilder, private neighborhoodService: NeighborhoodService, private toastr: ToastrService) {
    this.warehouseForm = new WarehouseForm();
    this.warehouse = new Warehouse();
  }

  ngOnInit() {
    this.createForm();
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.warehouseService.getById(id).subscribe(warehouse => {
      this.warehouse = warehouse;
      this.warehouseForm.description = warehouse.description;
      this.warehouseForm.address = warehouse.address;
      this.warehouseForm.capacity = warehouse.capacity;
      this.warehouseForm.neighborhoodId = warehouse.neighborhoodId;
      this.getProvinces();
      this.getMunicipalities();
      this.getNeighborhoods();
      console.log('chi', this.warehouse);
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  private createForm() {
    this.editWarehouseForm = this.formBuilder.group({
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

  private getProvinces() {
    this.provinceService.getAll().subscribe(provinces => {
      this.warehouseForm.provinces = provinces;
      this.warehouseForm.provinceId = this.warehouse.neighborhood.municipality.provinceId;
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  private getNeighborhoods() {
    this.neighborhoodService.getByMunicipalityId(this.warehouseForm.municipalityId).subscribe(neighborhoods => {
      this.warehouseForm.neighborhoods = neighborhoods;
      this.warehouseForm.neighborhoodId = this.warehouse.neighborhood.id;
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  private getMunicipalities() {
    this.municipalityService.getByProvinceId(this.warehouseForm.provinceId).subscribe(municipalities => {
      this.warehouseForm.municipalities = municipalities;
      this.warehouseForm.municipalityId = this.warehouse.neighborhood.municipality.id;
    },
      error => alert(error),
      () => console.log('Request completed')
    );
  }

  onSubmit() {
    this.update();
  }

  update() {
    this.setValues();
    this.warehouseService.update(this.warehouse).subscribe(
      _ => {
        this.toastr.success(`Almacen: ${this.warehouse.description} editado sastifactoriamente.`, 'Información');
        this.router.navigate(['/warehouse']);
      },
      errResponse => this.toastr.error('Ocurrió un error tratando de crear un almacén. Razón: ' + errResponse.error.error, 'Información')
    );
  }

  private setValues() {
    this.warehouse.address = this.warehouseForm.address;
    this.warehouse.capacity = this.warehouseForm.capacity;
    this.warehouse.description = this.warehouseForm.description;
    this.warehouse.neighborhoodId = this.warehouseForm.neighborhoodId;
  }

}
