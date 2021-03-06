import { Neighborhood } from "./neighborhood.model";

export class Warehouse {
  id: number;
  address: string;
  capacity: number;
  description: string;
  isActive: boolean;
  neighborhoodId: number;
  neighborhood: Neighborhood;
}
