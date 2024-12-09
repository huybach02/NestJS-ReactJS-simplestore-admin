import {Button, Col, Flex, Grid, Row, Typography} from "antd";
import {setShowModal} from "../redux/slice/dataSlice";
import {TbDownload, TbFilter, TbPlus} from "react-icons/tb";
import {useDispatch} from "react-redux";
import {transformTitle} from "../utils/convertTitle";

const TitlePage = ({title}: {title: string}) => {
  const dispatch = useDispatch();

  const {lg} = Grid.useBreakpoint();

  return (
    <Row align="middle" justify="space-between">
      <Col span={lg ? 3 : 24} style={{marginBottom: lg ? "" : "16px"}}>
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
          <Button
            type="primary"
            onClick={() => {
              dispatch(setShowModal());
            }}
            icon={<TbPlus size={16} />}
          >
            Add new {transformTitle(title)}
          </Button>
          <Flex gap={10}>
            <Button icon={<TbFilter size={16} />}>Filters</Button>
            <Button icon={<TbDownload size={16} />}>Download all</Button>
          </Flex>
        </Flex>
      </Col>
    </Row>
  );
};

export default TitlePage;
