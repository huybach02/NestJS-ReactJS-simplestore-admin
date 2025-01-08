/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Flex,
  Form,
  Image,
  message,
  Modal,
  Table,
  Typography,
} from "antd";
import {Grid} from "antd";

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {RootState} from "../redux/store";
import {usePage} from "../hook/usePage";
import TitlePage from "../components/TitlePage";
import ExportForm from "../exportForm/ExportForm";
import {clearExportFields, setCloseModal} from "../redux/slice/dataSlice";
import {TableRowSelection} from "antd/es/table/interface";
import dayjs from "dayjs";
import {ReviewType} from "../types/reviewType";
import {ReviewColumns} from "../columns/ReviewColumn";
import {IoStar, IoStarOutline} from "react-icons/io5";
import TextArea from "antd/es/input/TextArea";
import axiosInstance from "../config/axios";

const endpoint = "reviews";
type DataType = ReviewType;

export const ReviewScreen = () => {
  const dispatch = useDispatch();

  const {isLoading, showModal, total} = useSelector(
    (state: RootState) => state.data
  );

  const [itemSelected, setItemSelected] = useState<DataType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [reply, setReply] = useState<string>("");

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
  });

  const columns = ReviewColumns({
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

  const handleReply = async () => {
    try {
      await axiosInstance.post(`reviews/reply/${itemSelected?._id}`, {
        reply,
      });
      dispatch(setCloseModal());
      handleGetData();
    } catch (_error: any) {
      message.error(_error.response.data.message);
    }
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
            title="Reviews"
            endpoint={endpoint}
            formElement={<ExportForm endpoint={endpoint} />}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            handleGetData={handleGetData}
            showAddButton={false}
          />
        )}
        rowSelection={rowSelection}
      />

      <Modal
        title="Detail Review"
        open={showModal}
        onCancel={() => dispatch(setCloseModal())}
        footer={null}
      >
        <Flex vertical gap={20} style={{marginTop: 20}}>
          <Flex align="center" gap={20}>
            <Avatar
              src={
                itemSelected?.userId?.avatar ||
                "https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png"
              }
              size={"large"}
              style={{border: "1px solid #e0e0e0"}}
            />
            <Typography.Text style={{fontWeight: 600, fontSize: 18}}>
              {itemSelected?.userId?.name}
            </Typography.Text>
          </Flex>
          <Flex vertical gap={20}>
            <Typography.Text>
              <b>Product: </b>
              <Flex justify="space-between" align="center" gap={10} wrap>
                <Typography.Text>
                  {itemSelected?.productId?.name}
                </Typography.Text>
                <Image
                  src={itemSelected?.productId?.thumbnail}
                  alt="product"
                  width={60}
                />
              </Flex>
            </Typography.Text>
            <Typography.Text>
              <b>Rating: </b>
              {Array.from({length: itemSelected?.rating || 0}).map(
                (_, index) => (
                  <IoStar key={index} color="#ff8f00" size={14} />
                )
              )}
              {Array.from({length: 5 - (itemSelected?.rating || 0)}).map(
                (_, index) => (
                  <IoStarOutline key={index} color="#ff8f00" size={14} />
                )
              )}
            </Typography.Text>
            <Typography.Text>
              <b>Title Review: </b>
              {itemSelected?.title}
            </Typography.Text>
            <Typography.Text>
              <b>Review: </b>
              {itemSelected?.review}
            </Typography.Text>
            <Typography.Text>
              <b>Images: </b>
              <Flex gap={10} wrap style={{marginTop: 10}}>
                {itemSelected?.images?.map((image) => (
                  <Image src={image} alt="review" width={60} />
                ))}
              </Flex>
            </Typography.Text>
            <Typography.Text>
              <b>Created At: </b>
              {dayjs(itemSelected?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </Typography.Text>

            <Typography.Text>
              <b>Replied: </b>
              <TextArea
                defaultValue={itemSelected?.replyByAdmin || ""}
                onChange={(e) => {
                  setReply(e.target.value);
                }}
                style={{marginTop: 10}}
                rows={4}
              />
            </Typography.Text>
            <Button type="primary" onClick={handleReply}>
              Reply
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </div>
  );
};
