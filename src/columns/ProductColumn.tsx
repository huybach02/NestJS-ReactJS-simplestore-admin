/* eslint-disable @typescript-eslint/no-explicit-any */
import {Avatar, Badge, Button, Flex, Tooltip, Tree} from "antd";
import {FaCaretRight, FaImage} from "react-icons/fa";
import {FiEdit, FiTrash} from "react-icons/fi";
import {ColumnProps} from "antd/es/table";
import {formatMoney} from "../utils/formatMoney";
import {
  setIsConfirm,
  setIsEditing,
  setShowModal,
} from "../redux/slice/dataSlice";
import confirmAction from "../utils/confirmAction";
import {baseService} from "../service/baseService";
import {ProductType} from "../types/productType";
import dayjs from "dayjs";
import {createTreeCategoryByCurrentId} from "../utils/handleTreeValue";

interface Props {
  dispatch: any;
  form: any;
  setItemSelected: (product: ProductType | undefined) => void;
  handleGetData: () => void;
  endpoint: string;
  categories: any;
}

export const ProductColumns = ({
  dispatch,
  form,
  setItemSelected,
  handleGetData,
  endpoint,
  categories,
}: Props): ColumnProps<ProductType>[] => {
  return [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (photoUrl) => (
        <Avatar src={photoUrl} shape="square" size={50} icon={<FaImage />} />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      render: (supplier) => (supplier ? supplier.name : "------"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (value) => {
        const treeCategory = createTreeCategoryByCurrentId(
          categories,
          value.id
        );
        console.log(treeCategory);
        return treeCategory.length > 0 ? (
          <Tree
            showLine
            switcherIcon={<FaCaretRight size={18} />}
            defaultExpandAll={true}
            treeData={treeCategory}
          />
        ) : null;
      },
    },
    {
      title: "Original Price",
      dataIndex: "originalPrice",
      key: "originalPrice",
      render: (price) => formatMoney(price),
      sorter: (a, b) => Number(a.originalPrice) - Number(b.originalPrice),
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      key: "salePrice",
      render: (price) => (price ? formatMoney(price) : "--"),
      sorter: (a, b) => Number(a.salePrice) - Number(b.salePrice),
    },
    {
      title: "Has Sale",
      dataIndex: "hasSale",
      key: "hasSale",
      render: (hasSale) => (
        <Badge
          className="site-badge-count-109"
          count={hasSale ? "Sale" : "Not Sale"}
          style={{backgroundColor: hasSale ? "#389e0d" : "red"}}
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
                form.setFieldsValue({
                  ...record,
                  saleStartDate: record.saleStartDate
                    ? dayjs(record.saleStartDate)
                    : null,
                  saleEndDate: record.saleEndDate
                    ? dayjs(record.saleEndDate)
                    : null,
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
