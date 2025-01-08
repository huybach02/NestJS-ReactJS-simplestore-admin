import {
  Button,
  Col,
  Dropdown,
  Flex,
  Grid,
  MenuProps,
  Row,
  Space,
  Typography,
} from "antd";
import {setShowModal, setShowModalExport} from "../redux/slice/dataSlice";
import {
  TbCheck,
  TbDownload,
  // TbFilter,
  TbPlus,
  TbTrash,
  TbX,
} from "react-icons/tb";
import {useDispatch} from "react-redux";
import {transformTitle} from "../utils/convertTitle";
import {ModalExport} from "./ModalExport";
import {FaCaretDown} from "react-icons/fa";
import {handleActionWhenSelected} from "../utils/handleActionWhenSelected";
import confirmAction from "../utils/confirmAction";

const TitlePage = ({
  title,
  endpoint,
  formElement,
  selectedRowKeys,
  setSelectedRowKeys,
  handleGetData,
  showAddButton = true,
  showExport = true,
}: {
  title: string;
  endpoint: string;
  formElement: React.ReactNode;
  selectedRowKeys?: React.Key[];
  setSelectedRowKeys?: (selectedRowKeys: React.Key[]) => void;
  handleGetData?: () => void;
  showAddButton?: boolean;
  showExport?: boolean;
}) => {
  const dispatch = useDispatch();

  const {lg} = Grid.useBreakpoint();

  const items: MenuProps["items"] = [
    {
      label: "Activate selected items",
      key: "1",
      icon: <TbCheck />,
    },
    {
      label: "Inactivate selected items",
      key: "2",
      icon: <TbX />,
    },
    {
      label: "Delete selected items",
      key: "3",
      icon: <TbTrash />,
      danger: true,
    },
  ];

  const handleDownload = async () => {
    dispatch(setShowModalExport());
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    confirmAction(
      async () =>
        await handleActionWhenSelected(
          endpoint,
          e.key,
          selectedRowKeys,
          handleGetData,
          setSelectedRowKeys
        )
    );
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <Row align="middle" justify="space-between">
        <Col span={lg ? 5 : 24} style={{marginBottom: lg ? "" : "16px"}}>
          <Flex align="center" gap={10}>
            <Typography.Text
              style={{
                fontSize: `${lg ? "30px" : "24px"}`,
                fontWeight: "bold",
              }}
            >
              {title}
            </Typography.Text>
          </Flex>
        </Col>
        <Col span={lg ? 8 : 24}>
          <Flex align="center" justify={lg ? "end" : "start"} gap={10} wrap>
            {showAddButton && (
              <Button
                type="primary"
                onClick={() => {
                  dispatch(setShowModal());
                }}
                icon={<TbPlus size={16} />}
              >
                Add new {transformTitle(title)}
              </Button>
            )}
            {showExport && (
              <Flex gap={10}>
                {/* <Button icon={<TbFilter size={16} />}>Filters</Button> */}
                <Button
                  icon={<TbDownload size={16} />}
                  onClick={handleDownload}
                >
                  Export excel
                </Button>
              </Flex>
            )}
          </Flex>
        </Col>
      </Row>
      {selectedRowKeys && selectedRowKeys?.length > 0 && (
        <Flex align="center" gap={10}>
          <Typography.Text>
            {selectedRowKeys?.length} items selected
          </Typography.Text>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Choose action
                <FaCaretDown />
              </Space>
            </Button>
          </Dropdown>
        </Flex>
      )}
      <ModalExport title={title} endpoint={endpoint}>
        {formElement}
      </ModalExport>
    </>
  );
};

export default TitlePage;
