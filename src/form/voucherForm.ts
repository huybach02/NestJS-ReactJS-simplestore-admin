import {FormFields} from "../types/fieldType";
import {activeOptions} from "../utils/const";

export const voucherForm = (): FormFields => {
  return [
    {
      name: "title",
      label: "Voucher Name",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        placeholder: "Enter voucher name",
        allowClear: true,
      },
    },
    {
      name: "code",
      label: "Voucher Code",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        placeholder: "Enter voucher code",
        allowClear: true,
      },
    },
    {
      name: "startDate",
      label: "Start Date",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "datePickerWithTime",
        placeholder: "Select start date",
      },
    },
    {
      name: "endDate",
      label: "End Date",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "datePickerWithTime",
        placeholder: "Select end date",
      },
    },
    {
      name: "typeDiscount",
      label: "Type Discount",
      rules: [
        {
          required: true,
        },
      ],
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
      name: "valueDiscount",
      label: "Value Discount",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        type: "number",
        placeholder: "Enter value discount",
        allowClear: true,
      },
    },
    {
      name: "minAmountOfOrder",
      label: "Min Amount Of Order To Use",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        type: "number",
        placeholder: "Enter min amount of order",
        allowClear: true,
      },
    },
    {
      name: "maxDiscount",
      label: "Max Discount Amount ($)",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        type: "number",
        placeholder: "Enter max discount",
        allowClear: true,
      },
    },
    {
      name: "maxUser",
      label: "Max Users Can Use",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        type: "number",
        placeholder: "Enter max user",
        allowClear: true,
      },
    },
    {
      name: "numberOfUsesPerUser",
      label: "Max Vouchers Can Use Per User",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        type: "number",
        placeholder: "Enter number of uses per user",
        allowClear: true,
      },
    },

    activeOptions,
  ];
};
