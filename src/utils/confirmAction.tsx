/* eslint-disable @typescript-eslint/no-explicit-any */
import {ExclamationCircleFilled} from "@ant-design/icons";
import {Modal} from "antd";

const {confirm} = Modal;

const confirmAction = (promise: any) => {
  confirm({
    title: "Do you want to delete these items?",
    icon: <ExclamationCircleFilled />,
    content:
      "When clicked the OK button, this action will be permanently deleted.",
    onOk() {
      promise();
    },
    onCancel() {},
  });
};

export default confirmAction;
