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
      value: "product",
      label: "Product",
    },
    {
      value: "categories",
      label: "Categories",
    },
    {
      value: "price",
      label: "Buying Price",
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
};
