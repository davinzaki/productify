import type { BaseEntity } from "./base.entity";

export interface ProductCategoryEntity extends BaseEntity {
  id: number;
  name: string;
}
