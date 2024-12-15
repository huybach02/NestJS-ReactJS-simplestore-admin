import {FormFields, SelectOption} from "../types/fieldType";
import {activeOptions} from "../utils/const";
import {getCategoryTreeOptions} from "../utils/selectOption";

export const categoryForm = ({
  selectOptions = [],
}: {
  selectOptions?: SelectOption[];
}): FormFields => {
  return [
    {
      name: "parentId",
      label: "Parent Category",
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
      name: "name",
      label: "Category Name",
      rules: [
        {
          required: true,
        },
      ],
      field: {
        fieldType: "input",
        placeholder: "Enter category name",
        allowClear: true,
      },
    },
    activeOptions,
  ];
};
