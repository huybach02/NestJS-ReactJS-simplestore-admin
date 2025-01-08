/* eslint-disable @typescript-eslint/no-explicit-any */
import {Badge, Button, Flex, Tooltip} from "antd";
import {FiEye, FiTrash} from "react-icons/fi";
import {ColumnProps} from "antd/es/table";
import {setIsConfirm, setShowModal} from "../redux/slice/dataSlice";
import confirmAction from "../utils/confirmAction";
import {baseService} from "../service/baseService";
import {ReviewType} from "../types/reviewType";
import {IoStar, IoStarOutline} from "react-icons/io5";

interface Props {
  dispatch: any;
  form: any;
  setItemSelected: (review: ReviewType | undefined) => void;
  handleGetData: () => void;
  endpoint: string;
}

export const ReviewColumns = ({
  dispatch,
  setItemSelected,
  handleGetData,
  endpoint,
}: Props): ColumnProps<ReviewType>[] => {
  return [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Product",
      dataIndex: "productId",
      key: "productId",
      render: (productId) => <span>{productId.name}</span>,
    },
    {
      title: "Customer",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => <span>{userId.name}</span>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <span>
          {Array.from({length: rating}).map((_, index) => (
            <IoStar key={index} color="#ff8f00" />
          ))}
          {Array.from({length: 5 - rating}).map((_, index) => (
            <IoStarOutline key={index} color="#ff8f00" />
          ))}
        </span>
      ),
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
          <Tooltip title="View">
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
