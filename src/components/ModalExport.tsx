/* eslint-disable @typescript-eslint/no-explicit-any */
import {Modal, Typography} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setCloseModalExport} from "../redux/slice/dataSlice";
import {exportExcel} from "../utils/exportExcel";

export const ModalExport = ({
  title,
  children,
  endpoint,
}: {
  title: string;
  children: React.ReactNode;
  endpoint: string;
}) => {
  const dispatch = useDispatch();

  const {showModalExport, isLoading, exportFields} = useSelector(
    (state: RootState) => state.data
  );

  const handleExport = async () => {
    await exportExcel(endpoint, title, exportFields);
  };

  return (
    <Modal
      centered
      open={showModalExport}
      okText="Submit"
      onOk={handleExport}
      // maskClosable={false}
      closable={!isLoading}
      onCancel={() => {
        dispatch(setCloseModalExport());
      }}
      width={700}
      title={
        <Typography.Text style={{fontSize: "28px", fontWeight: "bold"}}>
          Export {title} To Excel
        </Typography.Text>
      }
      loading={isLoading}
    >
      <div>{children}</div>
    </Modal>
  );
};

// {
//   name: "type",
//   label: "Type",
//   rules: [],
//   initialValue: [],
//   field: {
//     fieldType: "checkbox",
//     options: [
//       {
//         label: "Hot",
//         value: "hot",
//       },
//       {
//         label: "New",
//         value: "new",
//       },
//       {
//         label: "Best Seller",
//         value: "best_seller",
//       },
//     ],
//     isButton: true,
//     isFullWidth: true,
//   },
// },
