import {FormFields, SelectOption} from "../types/fieldType";
import {activeOptions} from "../utils/const";
import {getCategoryTreeOptions, selectOption} from "../utils/selectOption";

export const productForm = ({
  selectOptions = [],
}: {
  selectOptions?: SelectOption[];
  radioOptions?: SelectOption[];
}): FormFields => {
  return [
    {
      name: "name",
      label: "Product Name",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        placeholder: "Enter product name",
        allowClear: true,
      },
    },
    {
      name: "sku",
      label: "SKU",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        placeholder: "Enter SKU",
        allowClear: true,
      },
    },
    {
      name: "supplier",
      label: "Supplier",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "select",
        placeholder: "Please select",
        options: selectOption(selectOptions, "suppliers"),
      },
    },
    {
      name: "hasVariant",
      label: "Has Variant ?",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "radio",
        options: [
          {
            label: "Yes",
            value: true,
          },
          {
            label: "No",
            value: false,
          },
        ],
        isButton: true,
        isFullWidth: true,
      },
    },
    {
      name: "importPrice",
      label: "Import Price ($)",
      rules: [
        {
          required: true,
        },
      ],
      dependencies: ["hasVariant"],
      hidden: (form) => {
        if (form.getFieldValue("hasVariant") === true) {
          return true;
        } else if (form.getFieldValue("hasVariant") === false) {
          return false;
        } else {
          return true;
        }
      },
      field: {
        fieldType: "input",
        placeholder: "Enter Import Price",
        allowClear: true,
        type: "number",
      },
    },
    {
      name: "originalPrice",
      label: "Original Price ($)",
      rules: [
        {
          required: true,
        },
      ],
      dependencies: ["hasVariant"],
      hidden: (form) => {
        if (form.getFieldValue("hasVariant") === true) {
          return true;
        } else if (form.getFieldValue("hasVariant") === false) {
          return false;
        } else {
          return true;
        }
      },
      field: {
        fieldType: "input",
        placeholder: "Enter Original Price",
        allowClear: true,
        type: "number",
      },
    },
    {
      name: "quantity",
      label: "Quantity",
      rules: [
        {
          required: true,
        },
      ],
      dependencies: ["hasVariant"],
      hidden: (form) => {
        if (form.getFieldValue("hasVariant") === true) {
          return true;
        } else if (form.getFieldValue("hasVariant") === false) {
          return false;
        } else {
          return true;
        }
      },
      field: {
        fieldType: "input",
        type: "number",
        placeholder: "Enter Quantity",
        allowClear: true,
      },
    },
    {
      name: "hasSale",
      label: "Has Sale ?",
      rules: [
        {
          required: true,
        },
      ],
      dependencies: ["hasVariant"],
      hidden: (form) => {
        if (form.getFieldValue("hasVariant") === true) {
          return true;
        } else if (form.getFieldValue("hasVariant") === false) {
          return false;
        } else {
          return true;
        }
      },
      field: {
        fieldType: "radio",
        options: [
          {
            label: "Yes",
            value: true,
          },
          {
            label: "No",
            value: false,
          },
        ],
        isButton: true,
        isFullWidth: true,
      },
    },
    {
      name: "typeSale",
      label: "Type Sale",
      rules: [
        {
          required: true,
        },
      ],
      dependencies: ["hasSale", "hasVariant"],
      hidden: (form) =>
        !form.getFieldValue("hasSale") || form.getFieldValue("hasVariant"),
      field: {
        fieldType: "radio",
        options: [
          {
            label: "Percentage",
            value: "percentage",
          },
          {
            label: "Fixed",
            value: "fixed",
          },
        ],
        isButton: true,
        isFullWidth: true,
      },
    },
    {
      name: "saleValue",
      label: "Sale Value",
      rules: [
        {
          required: true,
        },
      ],
      dependencies: ["hasSale", "hasVariant"],
      hidden: (form) =>
        !form.getFieldValue("hasSale") || form.getFieldValue("hasVariant"),
      field: {
        fieldType: "input",
        type: "number",
        placeholder: "Enter Sale Value",
        allowClear: true,
      },
    },
    {
      name: "saleStartDate",
      label: "Sale Start Date",
      rules: [
        {
          required: true,
        },
      ],
      dependencies: ["hasSale", "hasVariant"],
      hidden: (form) =>
        !form.getFieldValue("hasSale") || form.getFieldValue("hasVariant"),
      field: {
        fieldType: "datePicker",
        placeholder: "Select start date",
      },
    },
    {
      name: "saleEndDate",
      label: "Sale End Date",
      rules: [
        {
          required: true,
        },
      ],
      dependencies: ["hasSale", "hasVariant"],
      hidden: (form) =>
        !form.getFieldValue("hasSale") || form.getFieldValue("hasVariant"),
      field: {
        fieldType: "datePicker",
        placeholder: "Select end date",
      },
    },
    {
      name: "category",
      label: "Categories",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "treeSelect",
        placeholder: "Please select",
        options: getCategoryTreeOptions(selectOptions, "categories"),
      },
    },
    {
      name: "shortDescription",
      label: "Short Description",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "textArea",
        placeholder: "Enter Short Description",
      },
    },
    {
      name: "description",
      label: "Detail Description",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "editor",
        placeholder: "Enter Description",
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
