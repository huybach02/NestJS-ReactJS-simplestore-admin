/* eslint-disable @typescript-eslint/no-explicit-any */
import {Badge, Button, Flex, Tooltip} from "antd";
import {FiEdit, FiTrash} from "react-icons/fi";
import {ColumnProps} from "antd/es/table";
import {
  setIsConfirm,
  setIsEditing,
  setShowModal,
} from "../redux/slice/dataSlice";
import confirmAction from "../utils/confirmAction";
import {baseService} from "../service/baseService";
import {VoucherType} from "../types/voucherType";
import {formatMoney} from "../utils/formatMoney";
import dayjs from "dayjs";

interface Props {
  dispatch: any;
  form: any;
  setItemSelected: (voucher: VoucherType | undefined) => void;
  handleGetData: () => void;
  endpoint: string;
}

export const VoucherColumns = ({
  dispatch,
  form,
  setItemSelected,
  handleGetData,
  endpoint,
}: Props): ColumnProps<VoucherType>[] => {
  return [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Type",
      dataIndex: "typeDiscount",
      key: "typeDiscount",
      render: (typeDiscount) => (
        <Badge
          className="site-badge-count-109"
          count={typeDiscount === "percentage" ? "Percentage" : "Fixed"}
          style={{
            backgroundColor: "#000000",
          }}
        />
      ),
    },
    {
      title: "Value Discount",
      dataIndex: "valueDiscount",
      key: "valueDiscount",
      render: (valueDiscount, record) => (
        <span>
          {record.typeDiscount === "percentage"
            ? `${valueDiscount}%`
            : formatMoney(valueDiscount)}
        </span>
      ),
      minWidth: 150,
      sorter: (a, b) => a.valueDiscount - b.valueDiscount,
    },
    {
      title: "Used Count",
      dataIndex: "usedCount",
      key: "usedCount",
      width: 150,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active) => (
        <Badge
          className="site-badge-count-109"
          count={active ? "Active" : "Inactive"}
          style={{backgroundColor: active ? "#389e0d" : "red"}}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      fixed: "right",
      render: (record) => (
        <Flex gap={10}>
          <Tooltip title="Edit">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                dispatch(setIsEditing(true));
                dispatch(setShowModal());
                form.setFieldsValue({
                  ...record,
                  startDate: record.startDate ? dayjs(record.startDate) : null,
                  endDate: record.endDate ? dayjs(record.endDate) : null,
                });
                setItemSelected(record);
              }}
            >
              <FiEdit size={14} />
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              size="small"
              type="primary"
              danger
              onClick={async () => {
                dispatch(setIsConfirm(true));
                confirmAction(async () => {
                  await baseService.remove(endpoint, record._id as string);
                  setItemSelected(undefined);
                  handleGetData();
                });
              }}
              style={{height: "26px"}}
            >
              <FiTrash size={14} />
            </Button>
          </Tooltip>
        </Flex>
      ),
    },
  ];
};
