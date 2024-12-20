/* eslint-disable @typescript-eslint/no-explicit-any */
import {ExclamationCircleFilled} from "@ant-design/icons";
import {Modal} from "antd";

const {confirm} = Modal;

const confirmAction = (promise: any) => {
  confirm({
    title: "Do you want to perform this action?",
    icon: <ExclamationCircleFilled />,
    content: "When clicked the OK button, this action will be performed.",
    onOk() {
      promise();
    },
    onCancel() {},
  });
};

export default confirmAction;
