/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button, Flex, Form, List, Modal} from "antd";
import {useEffect, useState} from "react";
import {baseService} from "../service/baseService";
import confirmAction from "../utils/confirmAction";
import TextArea from "antd/es/input/TextArea";
import {FaEdit, FaTrash} from "react-icons/fa";

interface AddQuestionAndAnswerForm {
  question: string;
  answer: string;
}

const QuestionAndAnswerManage = () => {
  const [open, setOpen] = useState(false);
  const [productQuestionAnswer, setProductQuestionAnswer] = useState<any[]>([]);
  const [itemSelected, setItemSelected] = useState<any>(null);
  const [indexSelected, setIndexSelected] = useState<number | null>(null);

  const [form] = Form.useForm();

  const handleSubmit = async (values: AddQuestionAndAnswerForm) => {
    if (indexSelected !== null) {
      productQuestionAnswer[indexSelected] = {
        ...productQuestionAnswer[indexSelected],
        ...values,
      };
      await updateQuestionAndAnswerOrder(productQuestionAnswer);
    } else {
      await baseService.manageWebsite("productQuestionAnswer", {
        productQuestionAnswer: {
          ...values,
        },
      });
    }
    fetchProductQuestionAnswer();
    form.resetFields();
    setOpen(false);
    setItemSelected(null);
    setIndexSelected(null);
  };

  const fetchProductQuestionAnswer = async () => {
    const response = await baseService.getManageWebsite(
      "productQuestionAnswer"
    );
    setProductQuestionAnswer(response.data);
  };

  const updateQuestionAndAnswerOrder = async (newData: any) => {
    await baseService.updateManageWebsite("productQuestionAnswer", newData);
    fetchProductQuestionAnswer();
  };

  const handleDeleteQuestionAndAnswer = async (index: number) => {
    confirmAction(async () => {
      productQuestionAnswer.splice(index, 1);
      await updateQuestionAndAnswerOrder(productQuestionAnswer);
    });
  };

  useEffect(() => {
    fetchProductQuestionAnswer();
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
          Add New Question & Answer
        </Button>
      </Flex>

      <List
        itemLayout="horizontal"
        dataSource={productQuestionAnswer}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={item.question}
              description={item.answer}
              style={{width: "90%"}}
            />
            <Flex gap={10}>
              <Button
                type="default"
                icon={<FaEdit />}
                onClick={() => {
                  setItemSelected(item);
                  setIndexSelected(index);
                  setOpen(true);
                }}
              />
              <Button
                type="primary"
                danger
                icon={<FaTrash />}
                onClick={() => handleDeleteQuestionAndAnswer(index)}
              />
            </Flex>
          </List.Item>
        )}
        style={{marginTop: "40px"}}
      />

      <Modal
        title="Add New Question & Answer"
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
          <Form.Item label="Question" name="question">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item label="Answer" name="answer">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuestionAndAnswerManage;
