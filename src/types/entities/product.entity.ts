import type { BaseEntity } from "./base.entity";

export interface ProductEntity extends BaseEntity {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
}
