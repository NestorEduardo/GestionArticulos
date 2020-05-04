import { Category } from "./category.model";

export class Product {
  id: number;
  price: number;
  description: string;
  isActive: boolean;
  categoryId: number;
  category: Category
}
