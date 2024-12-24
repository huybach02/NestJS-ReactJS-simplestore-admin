/* eslint-disable @typescript-eslint/no-explicit-any */
import {Form, Table} from "antd";
import {Grid} from "antd";

import {useDispatch, useSelector} from "react-redux";
import {CustomModal} from "../components/CustomModal";
import {useEffect, useState} from "react";
import {RootState} from "../redux/store";
import {usePage} from "../hook/usePage";
import RenderForm from "../components/forms/RenderForm";
import TitlePage from "../components/TitlePage";
import ExportForm from "../exportForm/ExportForm";
import {clearExportFields} from "../redux/slice/dataSlice";
import {TableRowSelection} from "antd/es/table/interface";
import {FilterGroup} from "../components/FilterGroup";
import {useSearchParams} from "react-router-dom";
import {CreateVoucherType, VoucherType} from "../types/voucherType";
import {voucherForm} from "../form/voucherForm";
import {VoucherColumns} from "../columns/VoucherColumn";
import dayjs from "dayjs";

const endpoint = "vouchers";
type DataType = VoucherType;

export const VoucherScreen = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const {isLoading, isEditing, showModal, total} = useSelector(
    (state: RootState) => state.data
  );

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

  const columns = VoucherColumns({
    dispatch,
    form,
    setItemSelected,
    handleGetData,
    endpoint,
  });

  useEffect(() => {
    if (!showModal) {
      setItemSelected(undefined);
    }
  }, [showModal]);

  const handleSubmit = (values: CreateVoucherType) => {
    console.log(values);
    handleSubmitForm({
      ...values,
      startDate: values.startDate
        ? dayjs(values.startDate).format("YYYY-MM-DD HH:mm:ss")
        : null,
      endDate: values.endDate
        ? dayjs(values.endDate).format("YYYY-MM-DD HH:mm:ss")
        : null,
    });
  };

  useEffect(() => {
    dispatch(clearExportFields());
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
            key: "typeDiscount",
            defaultValue: "",
            options: [
              {value: "", label: "Type: All"},
              {value: "percentage", label: "Percentage"},
              {value: "fixed", label: "Fixed"},
            ],
          },
        ]}
      />
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
            title="Vouchers"
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
        title={isEditing ? "Edit Voucher" : "Add new voucher"}
        form={form}
        width={500}
      >
        <RenderForm
          fields={voucherForm()}
          form={form}
          handleSubmit={handleSubmit}
        />
      </CustomModal>
    </div>
  );
};
