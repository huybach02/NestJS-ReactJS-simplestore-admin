import {FormField} from "../types/fieldType";

export const activeOptions: FormField = {
  name: "active",
  label: "Status",
  rules: [
    {
      required: true,
    },
  ],
  initialValue: true,
  field: {
    fieldType: "radio",
    options: [
      {
        label: "Active",
        value: true,
      },
      {
        label: "Inactive",
        value: false,
      },
    ],
    isButton: true,
    isFullWidth: true,
  },
};

export const sizesOptions = [
  {label: "S", value: "S"},
  {label: "M", value: "M"},
  {label: "L", value: "L"},
  {label: "XL", value: "XL"},
  {label: "XXL", value: "XXL"},
];
