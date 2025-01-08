/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useEffect, useState} from "react";
import {baseService} from "../service/baseService";
import confirmAction from "../utils/confirmAction";
import {FaEdit, FaTrash} from "react-icons/fa";

interface AddCommitmentForm {
  icon: string;
  title: string;
  description: string;
}

const HomeCommitmentManage = () => {
  const [open, setOpen] = useState(false);
  const [homeCommitment, setHomeCommitment] = useState<any[]>([]);
  const [itemSelected, setItemSelected] = useState<any>(null);
  const [indexSelected, setIndexSelected] = useState<number | null>(null);

  const [form] = Form.useForm();

  const handleSubmit = async (values: AddCommitmentForm) => {
    if (indexSelected !== null) {
      homeCommitment[indexSelected] = {
        ...homeCommitment[indexSelected],
        ...values,
      };
      await updateCommitmentOrder(homeCommitment);
    } else {
      await baseService.manageWebsite("homeCommitment", {
        homeCommitment: {
          ...values,
        },
      });
    }
    fetchHomeCommitment();
    form.resetFields();
    setOpen(false);
    setItemSelected(null);
    setIndexSelected(null);
  };

  const fetchHomeCommitment = async () => {
    const response = await baseService.getManageWebsite("homeCommitment");
    setHomeCommitment(response.data);
  };

  const updateCommitmentOrder = async (newData: any) => {
    await baseService.updateManageWebsite("homeCommitment", newData);
    fetchHomeCommitment();
  };

  const handleDeleteCommitment = async (index: number) => {
    confirmAction(async () => {
      homeCommitment.splice(index, 1);
      await updateCommitmentOrder(homeCommitment);
    });
  };

  useEffect(() => {
    fetchHomeCommitment();
  }, []);

  useEffect(() => {
    if (itemSelected) {
      form.setFieldsValue(itemSelected);
    }
  }, [itemSelected]);

  return (
    <div>
      <Flex justify="end">
        <Button type="primary" onClick={() => setOpen(true)}>
          Add New Commitment
        </Button>
      </Flex>

      <Row gutter={[16, 20]} style={{marginTop: 40}}>
        {homeCommitment.map((item, index) => (
          <Col span={24} key={index} lg={6}>
            <Card style={{boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"}}>
              <Flex vertical align="center" gap={10}>
                <Typography.Title level={5}>{item.title}</Typography.Title>
                <Typography.Text style={{fontSize: 14, textAlign: "center"}}>
                  {item.description}
                </Typography.Text>
              </Flex>
              <Flex justify="center" gap={10} style={{marginTop: 20}}>
                <Button
                  type="default"
                  icon={<FaEdit />}
                  onClick={() => {
                    setOpen(true);
                    setItemSelected(item);
                    setIndexSelected(index);
                  }}
                />
                <Button
                  type="primary"
                  danger
                  icon={<FaTrash />}
                  onClick={() => handleDeleteCommitment(index)}
                />
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
          setItemSelected(null);
          setIndexSelected(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomeCommitmentManage;
