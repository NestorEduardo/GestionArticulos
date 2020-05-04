import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from "../models/warehouse.model";
import { WarehouseForm } from "../models/warehouse-form.model";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NeighborhoodService } from '../services/neighborhood.service';
import { ProvinceService } from "../services/province.service";
import { MunicipalityService } from "../services/municipality.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './delete-warehouse.component.html',
})

export class DeleteWarehouseComponent {
  warehouseForm: WarehouseForm;
  warehouse: Warehouse;
  editWarehouseForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private provinceService: ProvinceService, private municipalityService: MunicipalityService,
    private warehouseService: WarehouseService, private neighborhoodService: NeighborhoodService, private toastr: ToastrService) {

    this.warehouseForm = new WarehouseForm();
    this.warehouse = new Warehouse();
  }

  ngOnInit() {
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
    },
      error => alert(error),
      () => console.log('Request completed')
    );
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
    this.delete();
  }

  delete() {
    this.setValues();
    this.warehouseService.delete(this.warehouse).subscribe(
      _ => {
        this.toastr.success(`Almacen: ${this.warehouse.description} eliminado sastifactoriamente.`, 'Información');
        this.router.navigate(['/warehouse']);
      },
      errResponse => this.toastr.error('Ocurrió un error tratando de eliminar un almacén. Razón: ' + errResponse.error.error, 'Información')
    );
  }

  private setValues() {
    this.warehouse.address = this.warehouseForm.address;
    this.warehouse.capacity = this.warehouseForm.capacity;
    this.warehouse.description = this.warehouseForm.description;
    this.warehouse.neighborhoodId = this.warehouseForm.neighborhoodId;
  }
}
