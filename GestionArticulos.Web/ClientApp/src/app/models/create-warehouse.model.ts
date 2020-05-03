import { Warehouse } from "./warehouse.model";
import { Province } from "./province.model";
import { Municipality } from "./municipality.model";
import { Neighborhood } from "./neighborhood.model";

export class CreateWarehouse extends Warehouse {
  provinceId: number;
  municipalityId: number;
  neighborhoodId: number;
  provinces: Array<Province>
  municipalities: Array<Municipality>
  neighborhoods: Array<Neighborhood>
}


