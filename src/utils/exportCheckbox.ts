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
};
