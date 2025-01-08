/* eslint-disable @typescript-eslint/no-explicit-any */
import {Badge, Button, Flex, Image, Tooltip} from "antd";
import {FiEdit, FiTrash} from "react-icons/fi";
import {ColumnProps} from "antd/es/table";
import {
  setIsConfirm,
  setIsEditing,
  setShowModal,
} from "../redux/slice/dataSlice";
import confirmAction from "../utils/confirmAction";
import {baseService} from "../service/baseService";
import dayjs from "dayjs";
import {CategoryType} from "../types/categoryType";
import {calculateTotalProducts} from "../utils/handleTreeValue";

interface Props {
  dispatch: any;
  form: any;
  setItemSelected: (category: CategoryType | undefined) => void;
  handleGetData: () => void;
  endpoint: string;
  categories: any[];
}

export const CategoryColumns = ({
  dispatch,
  form,
  setItemSelected,
  handleGetData,
  endpoint,
}: // categories,
Props): ColumnProps<CategoryType>[] => {
  return [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail) =>
        thumbnail ? (
          <Image src={thumbnail} alt="thumbnail" width={100} height={130} />
        ) : null,
    },
    {
      title: "Product Count",
      dataIndex: "productCount",
      key: "productCount",
      render: (_, record) => {
        const totalProducts = calculateTotalProducts(record);
        return <span>{totalProducts}</span>;
      },
      minWidth: 50,
    },
    // {
    //   title: "Tree Category",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (value) => {
    //     const treeCategory = createTreeCategoryByCurrentId(categories, value);
    //     // return (
    //     //   <div>
    //     //     {treeCategory.map(
    //     //       (item, index) =>
    //     //         `${item.title} ${index < treeCategory.length - 1 ? " > " : ""} `
    //     //     )}
    //     //   </div>
    //     // );
    //     return treeCategory.length > 0 ? (
    //       <Tree
    //         showLine
    //         switcherIcon={<FaCaretRight size={18} />}
    //         defaultExpandAll={true}
    //         treeData={treeCategory}
    //       />
    //     ) : null;
    //   },
    // },
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
