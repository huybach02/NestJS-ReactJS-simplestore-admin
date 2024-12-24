/* eslint-disable @typescript-eslint/no-explicit-any */
import {Avatar, Badge, Button, Flex, Tooltip, Tree, Typography} from "antd";
import {FaCaretRight, FaImage} from "react-icons/fa";
import {FiEdit, FiTrash} from "react-icons/fi";
import {ColumnProps} from "antd/es/table";
import {formatMoney} from "../utils/formatMoney";
import {
  setIsConfirm,
  setIsEditing,
  setProductSelected,
  setShowDrawer,
  setShowModal,
} from "../redux/slice/dataSlice";
import confirmAction from "../utils/confirmAction";
import {baseService} from "../service/baseService";
import {ProductType} from "../types/productType";
import dayjs from "dayjs";
import {createTreeCategoryByCurrentId} from "../utils/handleTreeValue";
import {LiaSitemapSolid} from "react-icons/lia";

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
        <Avatar src={photoUrl} shape="square" size={60} icon={<FaImage />} />
      ),
      width: 100,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: 230,
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
      minWidth: 100,
      render: (value) => {
        if (value) {
          const treeCategory = createTreeCategoryByCurrentId(
            categories,
            value.id
          );
          return treeCategory.length > 0 ? (
            <Tree
              showLine
              switcherIcon={<FaCaretRight size={18} />}
              defaultExpandAll={true}
              treeData={treeCategory}
            />
          ) : null;
        }
        return "------";
      },
    },
    {
      title: "Buying Price",
      dataIndex: "originalPrice",
      key: "originalPrice",
      render: (price, record) => {
        if (record.hasVariant) {
          return (
            <Badge
              className="site-badge-count-109"
              count={`Has ${record.variants.length} Variant`}
              style={{backgroundColor: "#389e0d"}}
            />
          );
        } else {
          if (record.hasSale) {
            return (
              <Flex align="center" gap={10}>
                <Typography.Text delete>{formatMoney(price)}</Typography.Text>{" "}
                <Typography.Text>
                  {formatMoney(record.salePrice!)}
                </Typography.Text>
              </Flex>
            );
          } else {
            return <Typography.Text>{formatMoney(price)}</Typography.Text>;
          }
        }
      },
      minWidth: 100,
    },
    // {
    //   title: "Sale Price",
    //   dataIndex: "salePrice",
    //   key: "salePrice",
    //   render: (price) => (price ? formatMoney(price) : "--"),
    //   sorter: (a, b) => Number(a.salePrice) - Number(b.salePrice),
    //   minWidth: 100,
    // },
    {
      title: "Has Sale",
      dataIndex: "hasSale",
      key: "hasSale",
      render: (hasSale, record) => {
        const variantSales = record.variants.filter(
          (variant) => variant.hasSale
        );
        return (
          <Badge
            className="site-badge-count-109"
            count={
              !record.hasVariant
                ? hasSale
                  ? "Sale"
                  : "Not Sale"
                : `${variantSales.length} Variant Sale`
            }
            style={{
              backgroundColor: !record.hasVariant
                ? hasSale
                  ? "#389e0d"
                  : "red"
                : "#ff9900",
            }}
          />
        );
      },
    },
    {
      title: "Total Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => Number(a.quantity) - Number(b.quantity),
      minWidth: 100,
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
      width: 150,
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
          {record.hasVariant && (
            <Tooltip title="Variants">
              <Button
                size="small"
                type="default"
                style={{height: "27px"}}
                onClick={() => {
                  dispatch(setShowDrawer());
                  dispatch(
                    setProductSelected({
                      id: record._id as string,
                      name: record.name,
                      sku: record.sku,
                    })
                  );
                }}
              >
                <LiaSitemapSolid size={20} />
              </Button>
            </Tooltip>
          )}
        </Flex>
      ),
    },
  ];
};
