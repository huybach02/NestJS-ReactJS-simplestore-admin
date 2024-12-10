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

const endpoint = "suppliers";
type DataType = SupplierType;

export const SupplierScreen = () => {
  const dispatch = useDispatch();

  const {isLoading, isEditing, showModal, total} = useSelector(
    (state: RootState) => state.data
  );

  const [photoUrl, setPhotoUrl] = useState<string>();

  const [itemSelected, setItemSelected] = useState<DataType>();

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
            title="Suppliers"
            endpoint={endpoint}
            formElement={<ExportForm endpoint={endpoint} />}
          />
        )}
      />
      <CustomModal
        title={isEditing ? "Edit Supplier" : "Add new supplier"}
        form={form}
      >
        <Flex
          justify="center"
          align="center"
          gap={10}
          style={{marginTop: "20px"}}
        >
          <UploadSingleImage
            photoUrl={photoUrl}
            setPhotoUrl={setPhotoUrl}
            itemSelected={itemSelected}
          />
        </Flex>
        <RenderForm
          fields={supplierForm({
            selectOptions: [
              {
                name: "categories",
                options: [
                  {
                    value: "Clothes",
                    label: "Clothes",
                  },
                  {
                    value: "Shoes",
                    label: "Shoes",
                  },
                  {
                    value: "Accessories",
                    label: "Accessories",
                  },
                ],
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
