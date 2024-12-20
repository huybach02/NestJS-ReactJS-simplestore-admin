/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button, Drawer, Flex} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {
  clearMultipleImageUploaded,
  setCloseModal,
  setIsEditing,
  setSingleImageUploaded,
} from "../redux/slice/dataSlice";
import {deleteImage} from "../utils/deleteImageCloudinary";

export const CustomModal = ({
  title,
  children,
  form,
  width = 1000,
}: {
  title: string;
  children: React.ReactNode;
  form: any;
  width?: number;
}) => {
  const dispatch = useDispatch();

  const {showModal, isLoading, singleImageUploaded, multipleImageUploaded} =
    useSelector((state: RootState) => state.data);

  const handleDeleteImage = async () => {
    if (singleImageUploaded.publicId) {
      await deleteImage(singleImageUploaded.publicId);
      dispatch(setSingleImageUploaded({publicId: ""}));
    }
    if (multipleImageUploaded.publicId.length > 0) {
      multipleImageUploaded.publicId.forEach(async (publicId) => {
        await deleteImage(publicId);
      });
      dispatch(clearMultipleImageUploaded());
    }
  };

  return (
    // <Modal
    //   centered
    //   open={showModal}
    //   okText="Submit"
    //   onOk={() => form.submit()}
    //   maskClosable={false}
    //   closable={!isLoading}
    //   onCancel={() => {
    //     dispatch(setIsEditing(false));
    //     dispatch(setCloseModal());
    //     form.resetFields();
    //   }}
    //   width={width}
    //   title={
    //     <Typography.Text style={{fontSize: "28px", fontWeight: "bold"}}>
    //       {title}
    //     </Typography.Text>
    //   }
    //   loading={isLoading}
    // >
    //   {children}
    // </Modal>
    <Drawer
      title={title}
      placement="right"
      size={"large"}
      width={width}
      loading={isLoading}
      onClose={() => {
        dispatch(setIsEditing(false));
        dispatch(setCloseModal());
        handleDeleteImage();
        form.resetFields();
      }}
      open={showModal}
      closable={!isLoading}
      maskClosable={false}
    >
      {children}
      <Flex
        justify="center"
        align="center"
        gap={16}
        style={{marginTop: "40px"}}
      >
        <Button
          type="default"
          onClick={() => {
            dispatch(setIsEditing(false));
            dispatch(setCloseModal());
            handleDeleteImage();
            form.resetFields();
          }}
          style={{width: "30%"}}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={() => form.submit()}
          style={{width: "30%"}}
        >
          Submit
        </Button>
      </Flex>
      <div style={{height: "100px"}}></div>
    </Drawer>
  );
};
