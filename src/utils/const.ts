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
        value: "Active",
      },
      {
        label: "Inactive",
        value: "Inactive",
      },
    ],
    isButton: true,
    isFullWidth: true,
  },
};
