import {Moment} from "moment";
import {ProductVariantType} from "./productVariantType";

export type ProductType = {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  supplier: {
    _id: string;
    name: string;
  };
  hasVariant: boolean;
  importPrice: number;
  originalPrice: number;
  hasSale: boolean;
  typeSale: string | null;
  saleValue: number | null;
  salePrice: number | null;
  saleStartDate: Moment | null;
  saleEndDate: Moment | null;
  quantity: number;
  superCategory: {
    _id: string;
    name: string;
  };
  category: {
    _id: string;
    name: string;
  };
  takingReturn: string | null;
  thumbnail: string | null;
  photoUrls: string[];
  shortDescription: string;
  description: string;
  images: string[];
  variants: ProductVariantType[];
  active: boolean;
  createdAt: Moment;
  updatedAt: Moment;
};

export type CreateProductType = {
  name: string;
  slug: string;
  sku: string;
  supplier: string;
  importPrice: number;
  originalPrice: number;
  hasSale: boolean;
  typeSale: string | null;
  saleValue: number | null;
  salePrice: number | null;
  saleStartDate: Moment | null;
  saleEndDate: Moment | null;
  quantity: number;
  categories: string[];
  takingReturn: string | null;
  thumbnail: string | null;
  photoUrls: string[];
  shortDescription: string;
  description: string;
  active: boolean;
};
