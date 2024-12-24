/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from "antd";
import UploadSingleImage from "../UploadSingleImage";
import {sizesOptions} from "../../utils/const";

type VariantFormProps = {
  form: FormInstance;
  handleSubmit: (values: any) => void;
  photoUrl: string;
  setPhotoUrl: (url: string) => void;
};

const VariantForm = ({
  form,
  handleSubmit,
  photoUrl,
  setPhotoUrl,
}: VariantFormProps) => {
  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Name" name="name" rules={[{required: true}]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Sizes"
            name="sizes"
            // rules={[{required: true}]}
          >
            <Select
              mode="tags"
              style={{width: "100%"}}
              placeholder="Enter sizes of variant"
              options={sizesOptions}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Import Price ($)"
            name="importPrice"
            rules={[{required: true}]}
          >
            <InputNumber style={{width: "100%"}} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Original Price ($)"
            name="originalPrice"
            rules={[{required: true}]}
          >
            <InputNumber style={{width: "100%"}} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Has Sale ?"
            name="hasSale"
            rules={[{required: true}]}
          >
            <Radio.Group
              options={[
                {label: "Yes", value: true},
                {label: "No", value: false},
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.hasSale !== currentValues.hasSale
            }
          >
            {({getFieldValue}) => (
              <>
                {getFieldValue("hasSale") && (
                  <Form.Item
                    label="Type Sale"
                    name="typeSale"
                    rules={[{required: getFieldValue("hasSale")}]}
                  >
                    <Radio.Group
                      options={[
                        {label: "Percentage", value: "percentage"},
                        {label: "Fixed", value: "fixed"},
                      ]}
                      optionType="button"
                      buttonStyle="solid"
                    />
                  </Form.Item>
                )}
              </>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.hasSale !== currentValues.hasSale
            }
          >
            {({getFieldValue}) => (
              <>
                {getFieldValue("hasSale") && (
                  <Form.Item
                    label="Sale Value"
                    name="saleValue"
                    rules={[{required: getFieldValue("hasSale")}]}
                  >
                    <InputNumber style={{width: "100%"}} />
                  </Form.Item>
                )}
              </>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.hasSale !== currentValues.hasSale
            }
          >
            {({getFieldValue}) => (
              <>
                {getFieldValue("hasSale") && (
                  <Form.Item
                    label="Sale Start Date"
                    name="saleStartDate"
                    rules={[{required: getFieldValue("hasSale")}]}
                  >
                    <DatePicker
                      style={{width: "100%"}}
                      placeholder="Sale Start Date"
                      allowClear
                      // value={
                      //   form.getFieldValue(fieldName)
                      //     ? dayjs(form.getFieldValue(fieldName))
                      //     : null
                      // }
                    />
                  </Form.Item>
                )}
              </>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.hasSale !== currentValues.hasSale
            }
          >
            {({getFieldValue}) => (
              <>
                {getFieldValue("hasSale") && (
                  <Form.Item
                    label="Sale End Date"
                    name="saleEndDate"
                    rules={[{required: getFieldValue("hasSale")}]}
                  >
                    <DatePicker
                      style={{width: "100%"}}
                      placeholder="Sale End Date"
                      allowClear
                      // value={
                      //   form.getFieldValue(fieldName)
                      //     ? dayjs(form.getFieldValue(fieldName))
                      //     : null
                      // }
                    />
                  </Form.Item>
                )}
              </>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{required: true}]}
          >
            <InputNumber style={{width: "100%"}} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Status"
            name="active"
            rules={[{required: true}]}
            initialValue={true}
          >
            <Radio.Group
              options={[
                {label: "Active", value: true},
                {label: "Inactive", value: false},
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        </Col>
      </Row>
      <Flex
        justify="start"
        align="start"
        gap={10}
        style={{marginTop: "20px"}}
        vertical
      >
        <UploadSingleImage
          title="Thumbnail"
          photoUrl={photoUrl}
          setPhotoUrl={setPhotoUrl}
          oldImage={null}
        />
      </Flex>
      <Flex
        justify="center"
        align="center"
        gap={10}
        style={{marginTop: "40px"}}
      >
        <Button type="primary" htmlType="submit" style={{width: "30%"}}>
          Submit
        </Button>
      </Flex>
    </Form>
  );
};

export default VariantForm;
