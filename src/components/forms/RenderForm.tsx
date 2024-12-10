/* eslint-disable @typescript-eslint/no-explicit-any */
import {Checkbox, Form, Input, Radio, Select} from "antd";
import {Field, FormField} from "../../types/fieldType";

type Props = {
  fields: FormField[];
  form: any;
  handleSubmit: (values: any) => void;
};

const RenderForm = ({fields, form, handleSubmit}: Props) => {
  const renderField = (field: FormField) => {
    return (
      <Form.Item
        name={field.name}
        label={field.label}
        rules={field.rules}
        initialValue={field.initialValue}
      >
        {renderItem(field.field)}
      </Form.Item>
    );
  };

  const renderItem = (item: Field) => {
    switch (item.fieldType) {
      case "input":
        return (
          <Input
            placeholder={item.placeholder}
            allowClear
            type={item.type}
          ></Input>
        );
      case "select":
        return (
          <Select
            mode={item.mode}
            placeholder={item.placeholder}
            allowClear
            maxCount={item.maxCount}
          >
            {item.options.map((option: any) => {
              return (
                <Select.Option value={option.value}>
                  {option.label}
                </Select.Option>
              );
            })}
          </Select>
        );
      case "radio":
        return (
          <Radio.Group
            optionType={item.isButton ? "button" : "default"}
            buttonStyle="solid"
            style={{width: item.isFullWidth ? "100%" : "auto"}}
          >
            {item.options.map((option: any) => {
              return <Radio value={option.value}>{option.label}</Radio>;
            })}
          </Radio.Group>
        );
      case "checkbox":
        return (
          <Checkbox.Group
            options={item.options}
            style={{width: item.isFullWidth ? "100%" : "auto"}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      style={{marginTop: "20px"}}
      form={form}
    >
      {fields.map((field: any) => {
        return renderField(field);
      })}
    </Form>
  );
};

export default RenderForm;
