import {ReactNode} from "react";
import {ProductType} from "./productType";
import {ProductVariantType} from "./productVariantType";

export type OrderType = {
  _id: string;
  invoiceId: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  products: {
    id: string;
    product: ProductType;
    hasVariant: boolean;
    buyQuantity: number;
    variant: ProductVariantType;
    size: string;
  }[];
  voucher: {
    [x: string]: ReactNode;
    code: string;
    discount: number;
  };
  subTotal: number;
  discount: number;
  totalAmount: number;
  address: {
    receiver: string;
    phone: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    note?: string | null;
  };
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  estimatedDeliveryDate: Date;
  createdAt: Date | undefined | string;
  updatedAt: Date;
};
