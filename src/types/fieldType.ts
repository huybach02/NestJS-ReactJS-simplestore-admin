type Rule = {
  required?: boolean;
  message?: string;
};

export type Option = {
  label: string;
  value: string | number | boolean;
};

type BaseField = {
  fieldType: string;
  placeholder?: string;
  allowClear?: boolean;
};

type InputField = BaseField & {
  fieldType: "input";
  type?: string;
};

type SelectField = BaseField & {
  fieldType: "select";
  mode?: "multiple" | "tags";
  maxCount?: number;
  options: Option[];
};

type RadioField = BaseField & {
  fieldType: "radio";
  options: Option[];
  isButton?: boolean;
  isFullWidth?: boolean;
};

export type Field = InputField | SelectField | RadioField;

export type FormField = {
  name: string;
  label: string;
  rules?: Rule[];
  initialValue?: string | number | boolean;
  field: Field;
};

export type FormFields = FormField[];
