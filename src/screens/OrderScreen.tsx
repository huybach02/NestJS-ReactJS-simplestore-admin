/* eslint-disable @typescript-eslint/no-explicit-any */
import {Drawer, Form, Table} from "antd";
import {Grid} from "antd";

import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";
import {RootState} from "../redux/store";
import {usePage} from "../hook/usePage";
import TitlePage from "../components/TitlePage";
import ExportForm from "../exportForm/ExportForm";
import {clearExportFields, setCloseModal} from "../redux/slice/dataSlice";
import {FilterGroup} from "../components/FilterGroup";
import {useSearchParams} from "react-router-dom";
import {OrderType} from "../types/orderType";
import {OrderColumns} from "../columns/OrderColumn";
import OrderDetail from "../components/OrderDetail";

const endpoint = "orders";
type DataType = OrderType;

export const OrderScreen = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const {isLoading, total, showModal} = useSelector(
    (state: RootState) => state.data
  );

  const [itemSelected, setItemSelected] = useState<DataType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filter, setFilter] = useState({
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "createdAt_desc",
    active: searchParams.get("active") || "",
    paymentMethod: searchParams.get("paymentMethod") || "",
    paymentStatus: searchParams.get("paymentStatus") || "",
    orderStatus: searchParams.get("orderStatus") || "",
  });

  const [items, setItems] = useState<DataType[]>([]);

  const [form] = Form.useForm();

  const {lg} = Grid.useBreakpoint();

  const {
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

  const columns = OrderColumns({
    dispatch,
    form,
    setItemSelected,
    handleGetData,
    endpoint,
  });

  useEffect(() => {
    dispatch(clearExportFields());
  }, []);

  return (
    <div>
      <FilterGroup
        filter={filter}
        setFilter={setFilter}
        showStatusFilter={false}
        otherFilter={[
          {
            key: "paymentMethod",
            defaultValue: searchParams.get("paymentMethod") || "",
            options: [
              {
                label: "Payment Method: All",
                value: "",
              },
              {
                label: "Payment Method: COD",
                value: "cod",
              },
              {
                label: "Payment Method: PAYPAL",
                value: "paypal",
              },
            ],
            width: 200,
          },
          {
            key: "paymentStatus",
            defaultValue: searchParams.get("paymentStatus") || "",
            options: [
              {label: "Payment Status: All", value: ""},
              {label: "Payment Status: Success", value: "success"},
              {label: "Payment Status: Pending", value: "pending"},
              {label: "Payment Status: Failed", value: "failed"},
            ],
            width: 200,
          },
          {
            key: "orderStatus",
            defaultValue: searchParams.get("orderStatus") || "",
            options: [
              {label: "Order Status: All", value: ""},
              {label: "Order Status: Confirmed", value: "confirmed"},
              {label: "Order Status: Processing", value: "processing"},
              {label: "Order Status: Shipping", value: "shipping"},
              {label: "Order Status: Completed", value: "completed"},
              {label: "Order Status: Cancelled", value: "cancelled"},
            ],
            width: 200,
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
            title="Orders"
            endpoint={endpoint}
            formElement={<ExportForm endpoint={endpoint} />}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            handleGetData={handleGetData}
            showAddButton={false}
            showExport={false}
          />
        )}
      />

      <Drawer
        placement="bottom"
        open={showModal}
        onClose={() => dispatch(setCloseModal())}
        footer={null}
        title="Order Detail"
        width={lg ? "80%" : "90%"}
        height={lg ? "100%" : "90%"}
      >
        <OrderDetail order={itemSelected} handleGetData={handleGetData} />
      </Drawer>
    </div>
  );
};
