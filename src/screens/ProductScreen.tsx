/* eslint-disable @typescript-eslint/no-explicit-any */
import {Flex, Form, message, Table} from "antd";
import {Grid} from "antd";

import {useDispatch, useSelector} from "react-redux";
import {CustomModal} from "../components/CustomModal";
import {useEffect, useState} from "react";

import {RootState} from "../redux/store";
import {usePage} from "../hook/usePage";
import {replaceName} from "../utils/replaceName";
import RenderForm from "../components/forms/RenderForm";
import TitlePage from "../components/TitlePage";
import UploadSingleImage from "../components/UploadSingleImage";
import ExportForm from "../exportForm/ExportForm";
import {productForm} from "../form/productForm";
import {CreateProductType, ProductType} from "../types/productType";
import {ProductColumns} from "../columns/ProductColumn";
import {clearExportFields} from "../redux/slice/dataSlice";
import {SupplierType} from "../types/supplierType";
import {baseService} from "../service/baseService";
import {handleTreeValue} from "../utils/handleTreeValue";

const endpoint = "products";
type DataType = ProductType;

export const ProductScreen = () => {
  const dispatch = useDispatch();

  const {isLoading, isEditing, showModal, total} = useSelector(
    (state: RootState) => state.data
  );

  const [photoUrl, setPhotoUrl] = useState<string>();

  const [itemSelected, setItemSelected] = useState<DataType>();
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [items, setItems] = useState<DataType[]>([]);

  const [form] = Form.useForm();

  const {lg} = Grid.useBreakpoint();

  const {
    handleSubmitForm,
    handleGetData,
    currentPage,
    currentLimit,
    setCurrentPage,
    setCurrentLimit,
  } = usePage({
    endpoint,
    form,
    itemSelected,
    setItems,
  });

  const columns = ProductColumns({
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
    } else {
      if (itemSelected && itemSelected.supplier && itemSelected.category) {
        form.setFieldValue("supplier", itemSelected.supplier._id);
        form.setFieldValue("category", itemSelected.category?._id);
      }
    }
  }, [showModal, itemSelected, form]);

  const handleSubmit = (values: CreateProductType) => {
    if (!isEditing && !photoUrl) {
      message.error("Please upload thumbnail");
      return;
    }

    handleSubmitForm({
      ...values,
      slug: replaceName(values.name),
      thumbnail: !isEditing ? photoUrl : photoUrl || itemSelected?.thumbnail,
      saleStartDate: values.saleStartDate?.startOf("day").format() || null,
      saleEndDate: values.saleEndDate?.endOf("day").format() || null,
    });
  };

  const fetchSuppliersAndCategories = async () => {
    const [suppliersResponse, categoriesResponse] = await Promise.all([
      baseService.findAll("suppliers", 1, 99999, {
        active: true,
      }),
      baseService.findAll("categories", 1, 99999, {
        active: true,
      }),
    ]);
    setSuppliers(
      suppliersResponse.data.map((supplier: SupplierType) => ({
        label: supplier.name,
        value: supplier._id,
      }))
    );
    setCategories(handleTreeValue(categoriesResponse.data, "parentId"));
  };

  useEffect(() => {
    dispatch(clearExportFields());
    fetchSuppliersAndCategories();
  }, []);

  return (
    <div>
      <Table
        dataSource={items}
        columns={columns}
        loading={isLoading}
        rowKey="_id"
        scroll={{
          x: "max-content",
          y: `calc(100vh - ${lg ? "320px" : "120px"})`,
        }}
        pagination={{
          responsive: true,
          position: ["bottomCenter"],
          showSizeChanger: true,
          defaultPageSize: 10,
          pageSizeOptions: ["10", "20", "30", "50", "100"],
          onShowSizeChange(_, pageSize) {
            setCurrentLimit(pageSize);
          },
          onChange(page) {
            setCurrentPage(page);
          },
          total: total,
          current: +currentPage,
          pageSize: +currentLimit,
          showQuickJumper: true,
        }}
        title={() => (
          <TitlePage
            title="Products"
            endpoint={endpoint}
            formElement={<ExportForm endpoint={endpoint} />}
          />
        )}
      />
      <CustomModal
        title={isEditing ? "Edit Product" : "Add new product"}
        form={form}
        width={1000}
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
          fields={productForm({
            selectOptions: [
              {
                name: "suppliers",
                options: suppliers,
              },
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
