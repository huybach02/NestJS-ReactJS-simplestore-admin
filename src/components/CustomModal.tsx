/* eslint-disable @typescript-eslint/no-explicit-any */
import {Modal, Typography} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setCloseModal, setIsEditing} from "../redux/slice/dataSlice";

export const CustomModal = ({
  title,
  children,
  form,
}: {
  title: string;
  children: React.ReactNode;
  form: any;
}) => {
  const dispatch = useDispatch();

  const {showModal, isLoading} = useSelector((state: RootState) => state.data);

  return (
    <Modal
      centered
      open={showModal}
      okText="Submit"
      onOk={() => form.submit()}
      maskClosable={false}
      closable={!isLoading}
      onCancel={() => {
        dispatch(setIsEditing(false));
        dispatch(setCloseModal());
        form.resetFields();
      }}
      width={700}
      title={
        <Typography.Text style={{fontSize: "28px", fontWeight: "bold"}}>
          {title}
        </Typography.Text>
      }
      loading={isLoading}
    >
      {children}
    </Modal>
  );
};
