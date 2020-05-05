import { Product } from "./product.model";
import { Warehouse } from "./warehouse.model";

export class WarehouseProduct {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string;
  description: string;
  isActive: boolean;
  warehouseId: number;
  warehouse: Warehouse;
  productId: number;
  product: Product;
  count: number;
}
