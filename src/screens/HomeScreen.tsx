import {Col, Grid, Row} from "antd";
import StatisticCustom from "../components/StatisticCustom";
import {FaChartBar, FaChartLine, FaMoneyBill} from "react-icons/fa";
import {StatisticData} from "../types/statisticType";
import {FaHandHoldingDollar} from "react-icons/fa6";

const HomeScreen = () => {
  const {lg} = Grid.useBreakpoint();

  const saleData: StatisticData[] = [
    {
      key: "sales",
      description: "Sales",
      value: 1000,
      icon: <FaMoneyBill />,
      valueType: "currency",
      type: "horizontal",
    },
    {
      key: "revenue",
      description: "Revenue",
      value: 1000,
      icon: <FaChartBar />,
      valueType: "currency",
      type: "horizontal",
    },
    {
      key: "profit",
      description: "Profit",
      value: 1000,
      icon: <FaChartLine />,
      valueType: "currency",
      type: "horizontal",
    },
    {
      key: "cost",
      description: "Cost",
      value: 1000,
      icon: <FaHandHoldingDollar />,
      valueType: "currency",
      type: "horizontal",
    },
  ];

  return (
    <div style={{padding: 16}}>
      <Row gutter={[16, 16]}>
        <Col span={lg ? 14 : 24}>
          <StatisticCustom title="Sale Overview" data={saleData} />
          <StatisticCustom title="Sale Overview" data={saleData} />
          <StatisticCustom title="Sale Overview" data={saleData} />
          <StatisticCustom title="Sale Overview" data={saleData} />
        </Col>
        <Col span={lg ? 10 : 24}>
          <StatisticCustom
            title="Inventory Summary"
            data={saleData}
            span={12}
          />
        </Col>
      </Row>
    </div>
  );
};

export default HomeScreen;
