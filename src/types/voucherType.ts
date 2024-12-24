export type VoucherType = {
  _id: string;
  title: string;
  code: string;
  startDate: Date;
  endDate: Date;
  typeDiscount: string;
  valueDiscount: number;
  minOrder: number;
  maxDiscount: number;
  maxUser: number;
  maxUserPerOrder: number;
  usedCount: number;
  active: boolean;
  createdAt: string;
};

export type CreateVoucherType = {
  title: string;
  code: string;
  startDate: Date;
  endDate: Date;
  typeDiscount: string;
  valueDiscount: number;
  minOrder: number;
  maxDiscount: number;
  maxUser: number;
  maxUserPerOrder: number;
  usedCount: number;
  active: boolean;
};
