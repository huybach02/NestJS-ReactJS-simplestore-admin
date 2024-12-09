import {FormField} from "../types/fieldType";

export const activeOptions: FormField = {
  name: "active",
  label: "Active",
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
