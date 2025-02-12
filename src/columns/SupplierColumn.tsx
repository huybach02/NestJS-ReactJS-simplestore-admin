/* eslint-disable @typescript-eslint/no-explicit-any */
import {Avatar, Badge, Button, Flex, Grid, Tooltip} from "antd";
import {FaUser} from "react-icons/fa";
import {FiEdit, FiTrash} from "react-icons/fi";
import {ColumnProps} from "antd/es/table";
import {SupplierType} from "../types/supplierType";
import {
  setIsConfirm,
  setIsEditing,
  setShowModal,
} from "../redux/slice/dataSlice";
import confirmAction from "../utils/confirmAction";
import {baseService} from "../service/baseService";

interface Props {
  dispatch: any;
  form: any;
  setItemSelected: (supplier: SupplierType | undefined) => void;
  handleGetData: () => void;
  endpoint: string;
}

export const SupplierColumns = ({
  dispatch,
  form,
  setItemSelected,
  handleGetData,
  endpoint,
}: Props): ColumnProps<SupplierType>[] => {
  const {md} = Grid.useBreakpoint();
  return [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Avatar",
      dataIndex: "photoUrl",
      key: "photoUrl",
      render: (photoUrl) => (
        <Avatar
          src={photoUrl}
          shape="square"
          size={md ? 70 : 50}
          icon={<FaUser />}
        />
      ),
    },
    {
      title: "Supplier Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Supplier Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Taking Return",
      dataIndex: "takingReturn",
      key: "takingReturn",
      render: (type) => (
        <Badge
          className="site-badge-count-109"
          count={type === 1 ? "Taking return" : "Not taking return"}
          style={{
            backgroundColor: type === 1 ? "#389e0d" : "red",
          }}
        />
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
          <Tooltip title="Edit">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                dispatch(setIsEditing(true));
                dispatch(setShowModal());
                form.setFieldsValue(record);
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
