/* eslint-disable @typescript-eslint/no-explicit-any */
import {Badge, Button, Flex, Tag, Tooltip} from "antd";
import {FiEye} from "react-icons/fi";
import {ColumnProps} from "antd/es/table";
import {setShowModal} from "../redux/slice/dataSlice";
import {OrderType} from "../types/orderType";
import {formatMoney} from "../utils/formatMoney";

interface Props {
  dispatch: any;
  form: any;
  setItemSelected: (order: OrderType | undefined) => void;
  handleGetData: () => void;
  endpoint: string;
}

export const OrderColumns = ({
  dispatch,
  setItemSelected,
}: Props): ColumnProps<OrderType>[] => {
  return [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "70px",
    },
    {
      title: "Invoice ID",
      dataIndex: "invoiceId",
      key: "invoiceId",
      render: (invoiceId) => <span>{invoiceId}</span>,
      width: "200px",
    },
    {
      title: "Customer",
      dataIndex: "userId.name",
      key: "userId",
      render: (_name, record) => <span>{record.userId.name}</span>,
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
      key: "subTotal",
      render: (_name, record) => <span>{formatMoney(record.subTotal)}</span>,
      sorter: (a, b) => a.subTotal - b.subTotal,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (_name, record) => (
        <span>
          {record.discount ? "-" + formatMoney(record.discount) : "---"}
        </span>
      ),
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (_name, record) => <span>{formatMoney(record.totalAmount)}</span>,
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod) => (
        <span style={{textTransform: "uppercase"}}>
          <Badge color="#000" count={paymentMethod}></Badge>
        </span>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus) => (
        <span>
          {paymentStatus === "success" ? (
            <Tag color="green">Paid</Tag>
          ) : paymentStatus === "pending" ? (
            <Tag color="orange">Pending</Tag>
          ) : (
            <Tag color="red">Failed</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus) => (
        <span>
          {orderStatus === "confirmed" ? (
            <Tag color="blue">Confirmed</Tag>
          ) : orderStatus === "processing" ? (
            <Tag color="orange">Processing</Tag>
          ) : orderStatus === "shipping" ? (
            <Tag color="cyan">Shipping</Tag>
          ) : orderStatus === "completed" ? (
            <Tag color="green">Completed</Tag>
          ) : (
            <Tag color="red">Cancelled</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      fixed: "right",
      render: (record) => (
        <Flex gap={10}>
          <Tooltip title="View Order Detail">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                dispatch(setShowModal());
                setItemSelected(record);
              }}
            >
              <FiEye size={14} />
            </Button>
          </Tooltip>
        </Flex>
      ),
    },
  ];
};
