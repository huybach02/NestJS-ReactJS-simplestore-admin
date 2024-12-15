/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  TreeSelect,
} from "antd";
import {Field, FormField} from "../../types/fieldType";
import TextArea from "antd/es/input/TextArea";
import QuillEditor from "../QuillEditor";
import dayjs from "dayjs";

type Props = {
  fields: FormField[];
  form: any;
  handleSubmit: (values: any) => void;
};

const RenderForm = ({fields, form, handleSubmit}: Props) => {
  const renderField = (field: FormField, index: number) => {
    if (field.hidden && field.hidden(form)) {
      return null;
    }

    return (
      <Form.Item
        key={index}
        name={field.name}
        label={field.label}
        rules={field.rules}
        initialValue={field.initialValue}
        dependencies={field.dependencies}
      >
        {renderItem(field.field, field.name, index)}
      </Form.Item>
    );
  };

  const renderItem = (item: Field, fieldName: string, index: number) => {
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
            {item.options.map((option: any, index) => {
              return (
                <Select.Option value={option.value} key={index}>
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
            {item.options.map((option: any, index) => {
              return (
                <Radio value={option.value} key={index}>
                  {option.label}
                </Radio>
              );
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
      case "datePicker":
        return (
          <DatePicker
            style={{width: "100%"}}
            placeholder={item.placeholder}
            allowClear
            value={
              form.getFieldValue(fieldName)
                ? dayjs(form.getFieldValue(fieldName))
                : null
            }
          />
        );
      case "textArea":
        return <TextArea rows={4} placeholder={item.placeholder} key={index} />;
      case "editor":
        return (
          <QuillEditor
            value={form.getFieldValue(fieldName)}
            onChange={(value) => form.setFieldValue(fieldName, value)}
          />
        );
      case "treeSelect":
        return (
          <TreeSelect
            treeData={item.options}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
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
      <Form.Item noStyle shouldUpdate>
        {() => <>{fields.map((field, index) => renderField(field, index))}</>}
      </Form.Item>
    </Form>
  );
};

export default RenderForm;
