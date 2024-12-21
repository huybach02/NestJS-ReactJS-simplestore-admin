/* eslint-disable @typescript-eslint/no-explicit-any */
import {Flex, Form, Table} from "antd";
import {Grid} from "antd";

import {useDispatch, useSelector} from "react-redux";
import {CustomModal} from "../components/CustomModal";
import {useEffect, useState} from "react";

import {CreateSupplierType, SupplierType} from "../types/supplierType";

import {RootState} from "../redux/store";
import {usePage} from "../hook/usePage";
import {replaceName} from "../utils/replaceName";
import {SupplierColumns} from "../columns/SupplierColumn";
import RenderForm from "../components/forms/RenderForm";
import TitlePage from "../components/TitlePage";
import UploadSingleImage from "../components/UploadSingleImage";
import {supplierForm} from "../form/supplierForm";
import ExportForm from "../exportForm/ExportForm";
import {clearExportFields} from "../redux/slice/dataSlice";
import {TableRowSelection} from "antd/es/table/interface";
import {FilterGroup} from "../components/FilterGroup";
import {useSearchParams} from "react-router-dom";

const endpoint = "suppliers";
type DataType = SupplierType;

export const SupplierScreen = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const {isLoading, isEditing, showModal, total} = useSelector(
    (state: RootState) => state.data
  );

  const [photoUrl, setPhotoUrl] = useState<string>();

  const [itemSelected, setItemSelected] = useState<DataType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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

  const columns = SupplierColumns({
    dispatch,
    form,
    setItemSelected,
    handleGetData,
    endpoint,
  });

  useEffect(() => {
    if (!showModal) {
      setPhotoUrl("");
      setItemSelected(undefined);
    }
  }, [showModal]);

  const handleSubmit = (values: CreateSupplierType) => {
    handleSubmitForm({
      ...values,
      slug: replaceName(values.name),
      photoUrl: !isEditing ? photoUrl : photoUrl || itemSelected?.photoUrl,
    });
  };

  useEffect(() => {
    dispatch(clearExportFields());
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <FilterGroup filter={filter} setFilter={setFilter} />
      <Table
        dataSource={items}
        columns={columns}
        loading={isLoading}
        rowKey="_id"
        scroll={{
          x: "max-content",
          y: `calc(100vh - ${lg ? "360px" : "130px"})`,
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
          <TitlePage
            title="Suppliers"
            endpoint={endpoint}
            formElement={<ExportForm endpoint={endpoint} />}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            handleGetData={handleGetData}
          />
        )}
        rowSelection={rowSelection}
      />
      <CustomModal
        title={isEditing ? "Edit Supplier" : "Add new supplier"}
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
            title="Avatar"
            photoUrl={photoUrl}
            setPhotoUrl={setPhotoUrl}
            oldImage={itemSelected?.photoUrl}
          />
        </Flex>
        <RenderForm
          fields={supplierForm()}
          form={form}
          handleSubmit={handleSubmit}
        />
      </CustomModal>
    </div>
  );
};
