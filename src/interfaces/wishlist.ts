import { Product } from "./product";

export interface ResponseWishlist {
  status: string;
  count: number;
  data: Product[];
}