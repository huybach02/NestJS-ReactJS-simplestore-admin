import {Moment} from "moment";

export type ProductVariantType = {
  _id: string;
  productId: string;
  name: string;
  slug: string;
  sizes: string[];
  importPrice: number;
  originalPrice: number;
  hasSale: boolean;
  typeSale: string | null;
  saleValue: number | null;
  salePrice: number | null;
  saleStartDate: Moment | null;
  saleEndDate: Moment | null;
  quantity: number;
  thumbnail: string | null;
  active: boolean;
  createdAt: Moment;
  updatedAt: Moment;
};

export type CreateProductVariantType = {
  name: string;
  slug: string;
  sizes: string[];
  importPrice: number;
  originalPrice: number;
  hasSale: boolean;
  typeSale: string | null;
  saleValue: number | null;
  saleStartDate: Moment | null;
  saleEndDate: Moment | null;
  quantity: number;
  thumbnail: string | null;
  active: boolean;
};
