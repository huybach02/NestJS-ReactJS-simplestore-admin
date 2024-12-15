import {Card, Col, Flex, Grid, Row, Typography} from "antd";
import {StatisticData} from "../types/statisticType";
import {formatNumber} from "../utils/formatNumber";

type Props = {
  title: string;
  span?: number;
  data: StatisticData[];
};

const StatisticItem = ({data}: {data: StatisticData}) => {
  const {lg} = Grid.useBreakpoint();

  return (
    <Card style={{boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"}}>
      <Flex justify="space-between" align="center">
        <span
          style={{
            fontSize: lg ? 40 : 30,
            padding: "15px 20px 15px 20px",
            backgroundColor: "#f0f0f0",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data.icon}
        </span>
        <Flex vertical>
          <span style={{fontSize: 18}}>{data.description}</span>
          <span style={{fontSize: 20, fontWeight: "bold"}}>
            {data.valueType === "currency" ? "$" : ""}
            {formatNumber(data.value)}
          </span>
        </Flex>
      </Flex>
    </Card>
  );
};

const StatisticCustom = ({title, span = 8, data}: Props) => {
  const {lg} = Grid.useBreakpoint();

  return (
    <Card style={{marginBottom: 16}}>
      <Typography.Title level={4} style={{marginBottom: 20}}>
        {title}
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col span={lg ? span : 24} key={index}>
            <StatisticItem data={item} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default StatisticCustom;
