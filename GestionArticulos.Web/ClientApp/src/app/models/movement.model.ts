import { Warehouse } from "./warehouse.model";
import { Product } from "./product.model";
import { MovementType } from "./movement-type.model";

export class Movement {
    id: number;
    movemenTypeId: number;
    warehouseId: number;
    productId: number;
    count: number;
    movemenType: MovementType
    warehouse: Array<Warehouse>
    product: Array<Product>
    isActive: boolean;
}
