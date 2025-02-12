/* eslint-disable @typescript-eslint/no-explicit-any */
import {Flex, Form, message, Table} from "antd";
import {Grid} from "antd";

import {useDispatch, useSelector} from "react-redux";
import {CustomModal} from "../components/CustomModal";
import {useEffect, useState} from "react";

import {RootState} from "../redux/store";
import {usePage} from "../hook/usePage";
import {replaceName} from "../utils/replaceName";
import TitlePage from "../components/TitlePage";
import ExportForm from "../exportForm/ExportForm";
import {CreateProductType} from "../types/productType";
import {clearExportFields} from "../redux/slice/dataSlice";
import {CategoryColumns} from "../columns/CategoryColumn";
import {CategoryType} from "../types/categoryType";
import {baseService} from "../service/baseService";
import {handleTreeValue} from "../utils/handleTreeValue";
import RenderForm from "../components/forms/RenderForm";
import {categoryForm} from "../form/categoryForm";
import UploadSingleImage from "../components/UploadSingleImage";

const endpoint = "categories";
type DataType = CategoryType;

export const CategoryScreen = () => {
  const dispatch = useDispatch();

  const {isLoading, isEditing, showModal} = useSelector(
    (state: RootState) => state.data
  );

  const [itemSelected, setItemSelected] = useState<DataType>();
  const [categories, setCategories] = useState<any[]>([]);

  const [photoUrl, setPhotoUrl] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_items, setItems] = useState<DataType[]>([]);

  const [form] = Form.useForm();

  const {lg} = Grid.useBreakpoint();

  const {
    handleSubmitForm,
    handleGetData,
    // currentPage,
    // currentLimit,
    // setCurrentPage,
    // setCurrentLimit,
  } = usePage({
    endpoint,
    form,
    itemSelected,
    setItems,
  });

  const columns = CategoryColumns({
    dispatch,
    form,
    setItemSelected,
    handleGetData,
    endpoint,
    categories,
  });

  useEffect(() => {
    if (!showModal) {
      setPhotoUrl("");
      setItemSelected(undefined);
    }
    fetchCategories();
  }, [showModal]);

  const handleSubmit = (values: CreateProductType) => {
    if (
      !form.getFieldValue("parentId") &&
      (!isEditing ? !photoUrl : !photoUrl && !itemSelected?.thumbnail)
    ) {
      message.error("Please upload a thumbnail for root category");
      return;
    }

    handleSubmitForm({
      ...values,
      slug: replaceName(values.name),
      thumbnail: !isEditing ? photoUrl : photoUrl || itemSelected?.thumbnail,
    });
  };

  const fetchCategories = async () => {
    const response = await baseService.findAll("categories", 1, 99999, {
      active: true,
    });

    setCategories(handleTreeValue(response.data, "parentId"));
  };

  useEffect(() => {
    dispatch(clearExportFields());
    fetchCategories();
  }, []);

  return (
    <div>
      <Table
        dataSource={categories}
        columns={columns}
        loading={isLoading}
        rowKey="_id"
        scroll={{
          x: "max-content",
          y: `calc(100vh - ${lg ? "260px" : "120px"})`,
        }}
        pagination={false}
        // pagination={{
        //   responsive: true,
        //   position: ["bottomCenter"],
        //   showSizeChanger: true,
        //   defaultPageSize: 10,
        //   pageSizeOptions: ["10", "20", "30", "50", "100"],
        //   onShowSizeChange(_, pageSize) {
        //     setCurrentLimit(pageSize);
        //   },
        //   onChange(page) {
        //     setCurrentPage(page);
        //   },
        //   total: total,
        //   current: +currentPage,
        //   pageSize: +currentLimit,
        //   showQuickJumper: true,
        // }}
        title={() => (
          <TitlePage
            title="Categories"
            endpoint={endpoint}
            formElement={<ExportForm endpoint={endpoint} />}
          />
        )}
      />
      <CustomModal
        title={isEditing ? "Edit Category" : "Add new category"}
        form={form}
        width={500}
      >
        <Flex
          justify="center"
          align="center"
          gap={10}
          style={{marginTop: "20px"}}
        >
          <UploadSingleImage
            title="Thumbnail"
            photoUrl={photoUrl}
            setPhotoUrl={setPhotoUrl}
            oldImage={itemSelected?.thumbnail}
          />
        </Flex>
        <RenderForm
          fields={categoryForm({
            selectOptions: [
              {
                name: "categories",
                options: categories,
              },
            ],
          })}
          form={form}
          handleSubmit={handleSubmit}
        />
      </CustomModal>
    </div>
  );
};
