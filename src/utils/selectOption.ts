/* eslint-disable @typescript-eslint/no-explicit-any */
import {SelectOption, TreeNode} from "../types/fieldType";

export const selectOption = (
  selectOptions: SelectOption[] = [],
  nameField: string
) => {
  const found = selectOptions.find(
    (selectOption: SelectOption) => selectOption.name === nameField
  );
  return found ? found.options : [];
};

export const getCategoryTreeOptions = (
  selectOptions: SelectOption[] = [],
  nameField: string
): TreeNode[] => {
  const found = selectOptions.find(
    (selectOption) => selectOption.name === nameField
  );

  if (!found) return [];

  return found.options.map((option): any => ({
    value: option.value.toString(),
    title: option.title,
    children: option.children,
  }));
};
