/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Divider,
  Drawer,
  Flex,
  Form,
  message,
  Space,
  Table,
  Typography,
} from "antd";
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
import {
  clearExportFields,
  clearProductSelected,
  setCloseDrawer,
} from "../redux/slice/dataSlice";
import {SupplierType} from "../types/supplierType";
import {baseService} from "../service/baseService";
import {handleTreeValue} from "../utils/handleTreeValue";
import ImageUploadZone from "../components/ImageUploadZone";
import Variant from "../components/Variant";
import {TableRowSelection} from "antd/es/table/interface";
import {FilterGroup} from "../components/FilterGroup";
import {useSearchParams} from "react-router-dom";

const endpoint = "products";
type DataType = ProductType;

export const ProductScreen = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const {isLoading, isEditing, showModal, showDrawer, total, productSelected} =
    useSelector((state: RootState) => state.data);

  const [photoUrl, setPhotoUrl] = useState<string>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [itemSelected, setItemSelected] = useState<DataType>();
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filter, setFilter] = useState({
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "createdAt_desc",
    active: searchParams.get("active") || "",
  });

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
    filter,
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
      setImageUrls([]);
      setItemSelected(undefined);
    } else {
      if (itemSelected && (itemSelected.supplier || itemSelected.category)) {
        form.setFieldValue("supplier", itemSelected.supplier?._id);
        form.setFieldValue("category", itemSelected.category?._id);
        setImageUrls(itemSelected.images || []);
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
      images: imageUrls,
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <FilterGroup
        filter={filter}
        setFilter={setFilter}
        otherFilter={[
          {
            key: "quantity",
            defaultValue: searchParams.get("quantity") || "",
            options: [
              {label: "Quantity: All", value: ""},
              {label: "Quantity: In Stock", value: "quantity_gt_0"},
              {label: "Quantity: Out of Stock", value: "quantity_eq_0"},
            ],
            width: 200,
          },
          {
            key: "supplier",
            defaultValue: searchParams.get("supplier") || "",
            options: [{label: "Supplier: All", value: ""}, ...suppliers],
            width: 200,
          },
        ]}
        hasFilterCategory={{
          isShow: true,
          options: categories,
        }}
      />
      <Table
        dataSource={items}
        columns={columns}
        loading={isLoading}
        rowKey="_id"
        scroll={{
          x: "max-content",
          y: `calc(100vh - ${lg ? "375px" : "130px"})`,
        }}
        pagination={{
          responsive: true,
          position: ["bottomCenter"],
          showSizeChanger: true,
          defaultPageSize: 10,
          pageSizeOptions: ["10", "20", "30", "50", "100", "1000"],
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
          <>
            <TitlePage
              title="Products"
              endpoint={endpoint}
              formElement={<ExportForm endpoint={endpoint} />}
              selectedRowKeys={selectedRowKeys}
              setSelectedRowKeys={setSelectedRowKeys}
              handleGetData={handleGetData}
            />
          </>
        )}
        rowSelection={rowSelection}
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
        <ImageUploadZone
          title="Images (optional)"
          setImageLists={setImageUrls}
          imageLists={imageUrls || itemSelected?.images || []}
          multiple={true}
          width="100%"
          style={{marginBottom: 50}}
        />
      </CustomModal>
      <Drawer
        title={`Variants Of Product`}
        placement="right"
        size={"large"}
        width={1000}
        onClose={() => {
          dispatch(setCloseDrawer());
          dispatch(clearProductSelected());
          handleGetData();
        }}
        open={showDrawer}
        extra={<Space></Space>}
      >
        <Typography.Title level={4}>
          Product Name: {productSelected?.name}
        </Typography.Title>
        <Typography.Title level={5}>
          SKU: {productSelected?.sku}
        </Typography.Title>
        <Divider />
        <Variant />
      </Drawer>
    </div>
  );
};
