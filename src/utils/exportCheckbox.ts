interface ExportCheckbox {
  [key: string]: {value: string; label: string}[];
}

export const exportCheckbox: ExportCheckbox = {
  suppliers: [
    {
      value: "name",
      label: "Supplier Name",
    },
    {
      value: "email",
      label: "Supplier Email",
    },
    {
      value: "contact",
      label: "Contact",
    },
    {
      value: "takingReturn",
      label: "Taking Return",
    },
    {
      value: "active",
      label: "Status",
    },
    {
      value: "photoUrl",
      label: "Image",
    },
  ],
  categories: [
    {
      value: "name",
      label: "Category Name",
    },
  ],
  products: [
    {
      value: "name",
      label: "Product Name",
    },
    {
      value: "sku",
      label: "SKU",
    },
    {
      value: "supplier",
      label: "Supplier",
    },
    {
      value: "originalPrice",
      label: "Original Price",
    },
    {
      value: "hasSale",
      label: "Has Sale",
    },
    {
      value: "typeSale",
      label: "Type Sale",
    },
    {
      value: "saleValue",
      label: "Sale Value",
    },
    {
      value: "salePrice",
      label: "Sale Price",
    },
    {
      value: "saleStartDate",
      label: "Sale Start Date",
    },
    {
      value: "saleEndDate",
      label: "Sale End Date",
    },
    {
      value: "quantity",
      label: "Quantity",
    },
    {
      value: "category",
      label: "Category",
    },
    {
      value: "takingReturn",
      label: "Taking Return",
    },
    {
      value: "thumbnail",
      label: "Thumbnail",
    },
    {
      value: "photoUrls",
      label: "Photo URLs",
    },
    {
      value: "description",
      label: "Description",
    },
    {
      value: "active",
      label: "Status",
    },
  ],
  vouchers: [
    {
      value: "title",
      label: "Title",
    },
    {
      value: "code",
      label: "Code",
    },
    {
      value: "startDate",
      label: "Start Date",
    },
    {
      value: "endDate",
      label: "End Date",
    },
    {
      value: "typeDiscount",
      label: "Type Discount",
    },
    {
      value: "valueDiscount",
      label: "Value Discount",
    },
    {
      value: "minOrder",
      label: "Min Order",
    },
    {
      value: "maxDiscount",
      label: "Max Discount",
    },
    {
      value: "maxUser",
      label: "Max User",
    },
    {
      value: "maxUserPerOrder",
      label: "Max User Per Order",
    },
    {
      value: "usedCount",
      label: "Used Count",
    },
    {
      value: "active",
      label: "Status",
    },
  ],
};
