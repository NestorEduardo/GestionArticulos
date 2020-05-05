import { WarehouseProduct } from "./warehouse-product.model";

export class AddWarehouseProduct {
    warehouseId: number;
    productId: number;
    count: number;
    products: Array<WarehouseProduct>
}
