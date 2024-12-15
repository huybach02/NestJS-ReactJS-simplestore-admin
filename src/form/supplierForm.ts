import {FormFields} from "../types/fieldType";
import {activeOptions} from "../utils/const";

export const supplierForm = (): FormFields => {
  return [
    {
      name: "name",
      label: "Supplier Name",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        placeholder: "Enter supplier name",
        allowClear: true,
      },
    },
    {
      name: "email",
      label: "Supplier Email",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        placeholder: "Enter supplier email",
        allowClear: true,
      },
    },
    {
      name: "contact",
      label: "Contact Number",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        placeholder: "Enter Contact Number",
        allowClear: true,
      },
    },
    {
      name: "takingReturn",
      label: "Taking Return",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "radio",
        options: [
          {
            label: "Taking return",
            value: 1,
          },
          {
            label: "Not Taking return",
            value: 0,
          },
        ],
        isButton: true,
        isFullWidth: true,
      },
    },
    activeOptions,
  ];
};
