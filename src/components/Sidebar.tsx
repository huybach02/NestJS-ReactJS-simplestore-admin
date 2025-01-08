import {Layout, Menu, MenuProps, Image, Flex, Typography, Grid} from "antd";
import {Link, useLocation} from "react-router-dom";
import {
  FaFire,
  FaBoxes,
  FaChartPie,
  FaStore,
  FaClipboardList,
  FaList,
} from "react-icons/fa";
import {MdRateReview} from "react-icons/md";
import {RiCoupon2Fill, RiSettingsFill} from "react-icons/ri";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const {Sider} = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export const Sidebar = () => {
  const location = useLocation();

  const {showSidebar} = useSelector((state: RootState) => state.data);

  const {lg} = Grid.useBreakpoint();

  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: <Link to="/">Dashboard</Link>,
      icon: <FaFire size={20} />,
    },
    {
      key: "categories",
      label: <Link to="/categories">Categories</Link>,
      icon: <FaList size={18} />,
    },
    {
      key: "products",
      label: <Link to="/products">Products</Link>,
      icon: <FaBoxes size={20} />,
    },
    {
      key: "voucher",
      label: <Link to="/voucher">Vouchers</Link>,
      icon: <RiCoupon2Fill size={20} />,
    },
    {
      key: "supplier",
      label: <Link to="/supplier">Suppliers</Link>,
      icon: <FaStore size={20} />,
    },
    {
      key: "order",
      label: <Link to="/order">Orders</Link>,
      icon: <FaClipboardList size={20} />,
    },
    {
      key: "review",
      label: <Link to="/review">Reviews</Link>,
      icon: <MdRateReview size={20} />,
    },
    {
      key: "manage-store",
      label: <Link to="/manage-store">Manage Store</Link>,
      icon: <RiSettingsFill size={20} />,
    },
  ];

  return (
    <Sider
      width={lg === undefined ? 230 : lg ? 230 : showSidebar ? 230 : 0}
      theme="light"
      style={{
        height: "100vh",
      }}
    >
      <Flex
        justify="center"
        align="center"
        style={{padding: 20, flexDirection: "column"}}
      >
        <Image
          width={lg ? 180 : 150}
          src={import.meta.env.VITE_APP_LOGO_URL}
          preview={false}
        />
        <Typography.Title level={5} style={{marginTop: 10, fontWeight: 700}}>
          Admin Panel
        </Typography.Title>
      </Flex>
      <Menu
        theme="light"
        items={items}
        defaultSelectedKeys={[location.pathname.split("/")[1] || "dashboard"]}
      />
    </Sider>
  );
};
