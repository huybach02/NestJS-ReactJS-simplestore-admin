import {FormFields} from "../types/fieldType";
import {activeOptions} from "../utils/const";

type SelectOption = {
  name: string;
  options: {value: string | number; label: string}[];
};

const selectOption = (
  selectOptions: SelectOption[] = [],
  nameField: string
) => {
  const found = selectOptions.find(
    (selectOption: SelectOption) => selectOption.name === nameField
  );
  return found ? found.options : [];
};

export const supplierForm = ({
  selectOptions = [],
}: {
  selectOptions?: SelectOption[];
  radioOptions?: SelectOption[];
}): FormFields => {
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
      name: "product",
      label: "Product",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        placeholder: "Enter Product",
        allowClear: true,
      },
    },
    {
      name: "categories",
      label: "Categories",
      rules: [
        // {
        //   required: true,
        // },
      ],
      field: {
        fieldType: "select",
        mode: "multiple",
        maxCount: 5,
        placeholder: "Please select",
        options: selectOption(selectOptions, "categories"),
      },
    },
    {
      name: "price",
      label: "Buying Price",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        type: "number",
        placeholder: "Enter Buying Price",
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
            value: "Taking return",
          },
          {
            label: "Not Taking return",
            value: "Not taking return",
          },
        ],
        isButton: true,
        isFullWidth: true,
      },
    },
    activeOptions,
  ];
};
