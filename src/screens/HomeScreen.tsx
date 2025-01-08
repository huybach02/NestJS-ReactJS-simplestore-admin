import {Card, Col, Grid, Row} from "antd";
import StatisticCustom from "../components/StatisticCustom";
import {
  FaCoins,
  FaLayerGroup,
  FaMoneyBill,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import {StatisticData} from "../types/statisticType";
import {FaBoxesStacked, FaMessage, FaTicketSimple} from "react-icons/fa6";
import ChartCustom from "../components/ChartCustom";
import PieChartCustom from "../components/PieChartCustom";
import {baseService} from "../service/baseService";
import {useEffect, useState} from "react";
import {BiSolidCategory} from "react-icons/bi";
import {PiNewspaperClippingFill} from "react-icons/pi";

interface DashboardData {
  totalRevenue: number;
  totalDiscount: number;
  profit: number;
  totalOrder: number;
  orderStatus: {
    confirmed: number;
    processing: number;
    shipping: number;
    completed: number;
    cancelled: number;
  };
  totalCategory: number;
  totalProduct: number;
  totalSupplier: number;
  totalUser: number;
  totalVoucher: number;
  totalReview: number;
  barChartData: {
    month: string;
    totalRevenue: number;
    totalOrder: number;
    profit: number;
  }[];
  countReviewByRating: {
    _id: number;
    count: number;
  }[];
}

const HomeScreen = () => {
  const {lg} = Grid.useBreakpoint();

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const fetchDashboard = async () => {
    const response = await baseService.getDashboard();
    setDashboardData(response.data);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const incomeData: StatisticData[] = [
    {
      key: "totalRevenue",
      description: "Total Revenue",
      value: dashboardData?.totalRevenue || 0,
      icon: <FaMoneyBill color="#108ee9" />,
      valueType: "currency",
      type: "horizontal",
    },
    {
      key: "totalDiscount",
      description: "Total Discount",
      value: dashboardData?.totalDiscount || 0,
      icon: <FaTicketSimple color="#f50" />,
      valueType: "currency",
      type: "horizontal",
    },
    {
      key: "profit",
      description: "Profit",
      value: dashboardData?.profit || 0,
      icon: <FaCoins color="#87d068" />,
      valueType: "currency",
      type: "horizontal",
    },
  ];

  const orderData: StatisticData[] = [
    {
      key: "totalOrder",
      description: "Total Order",
      value: dashboardData?.totalOrder || 0,
      icon: <FaLayerGroup color="#b37feb" />,
      valueType: "number",
      type: "horizontal",
    },
    {
      key: "confirmedOrder",
      description: "Confirmed Order",
      value: dashboardData?.orderStatus?.confirmed || 0,
      icon: <FaLayerGroup color="#69b1ff" />,
      valueType: "number",
      type: "horizontal",
    },
    {
      key: "processingOrder",
      description: "Processing Order",
      value: dashboardData?.orderStatus?.processing || 0,
      icon: <FaLayerGroup color="#ffc069" />,
      valueType: "number",
      type: "horizontal",
    },
    {
      key: "shippingOrder",
      description: "Shipping Order",
      value: dashboardData?.orderStatus?.shipping || 0,
      icon: <FaLayerGroup color="#5cdbd3" />,
      valueType: "number",
      type: "horizontal",
    },
    {
      key: "completedOrder",
      description: "Completed Order",
      value: dashboardData?.orderStatus?.completed || 0,
      icon: <FaLayerGroup color="#95de64" />,
      valueType: "number",
      type: "horizontal",
    },
    {
      key: "cancelledOrder",
      description: "Cancelled Order",
      value: dashboardData?.orderStatus?.cancelled || 0,
      icon: <FaLayerGroup color="#ff7875" />,
      valueType: "number",
      type: "horizontal",
    },
  ];

  const systemData: StatisticData[] = [
    {
      key: "categories",
      description: "Total Categories",
      value: dashboardData?.totalCategory || 0,
      icon: <BiSolidCategory />,
      valueType: "number",
      type: "horizontal",
    },
    {
      key: "products",
      description: "Total Products",
      value: dashboardData?.totalProduct || 0,
      icon: <FaBoxesStacked />,
      valueType: "number",
      type: "horizontal",
    },
    {
      key: "suppliers",
      description: "Total Suppliers",
      value: dashboardData?.totalSupplier || 0,
      icon: <FaUserTie />,
      valueType: "number",
      type: "horizontal",
    },
    {
      key: "users",
      description: "Total Users",
      value: dashboardData?.totalUser || 0,
      icon: <FaUsers />,
      valueType: "number",
      type: "horizontal",
    },
    {
      key: "vouchers",
      description: "Total Vouchers",
      value: dashboardData?.totalVoucher || 0,
      icon: <PiNewspaperClippingFill />,
      valueType: "number",
      type: "horizontal",
    },
    {
      key: "reviews",
      description: "Total Reviews",
      value: dashboardData?.totalReview || 0,
      icon: <FaMessage />,
      valueType: "number",
      type: "horizontal",
    },
  ];

  return (
    <div style={{padding: 16}}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <StatisticCustom title="Income Overview" data={incomeData} />
          <StatisticCustom title="Order Overview" data={orderData} />
          <StatisticCustom title="System Overview" data={systemData} />
          <Row gutter={[16, 16]}>
            <Col span={lg ? 12 : 24}>
              <Card title="Statistical Chart">
                <ChartCustom data={dashboardData?.barChartData || []} />
              </Card>
            </Col>
            <Col span={lg ? 12 : 24}>
              <Card title="Rating Chart">
                <PieChartCustom
                  data={dashboardData?.countReviewByRating || []}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomeScreen;
