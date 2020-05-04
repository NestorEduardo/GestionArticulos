import { Municipality } from "./municipality.model";

export class Neighborhood {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string;
  description: string;
  isActive: boolean;
  municipality: Municipality;
}
