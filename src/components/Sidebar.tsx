import {Layout, Menu, MenuProps, Image, Flex, Typography, Grid} from "antd";
import {Link, useLocation} from "react-router-dom";
import {
  FaFire,
  FaBoxes,
  FaChartPie,
  FaStore,
  FaClipboardList,
} from "react-icons/fa";
import {RiSettingsFill} from "react-icons/ri";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const {Sider} = Layout;

const style = {
  fontWeight: 700,
  fontSize: 16,
  display: "flex",
  alignItems: "center",
  marginTop: 20,
  marginBottom: 20,
  padding: "26px 10px 26px 10px",
};

type MenuItem = Required<MenuProps>["items"][number];

export const Sidebar = () => {
  const location = useLocation();

  const {showSidebar} = useSelector((state: RootState) => state.data);

  const {md} = Grid.useBreakpoint();

  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: <Link to="/">Dashboard</Link>,
      icon: <FaFire size={20} />,
      style,
    },
    {
      key: "inventory",
      label: <Link to="/inventory">Inventory</Link>,
      icon: <FaBoxes size={20} />,
      style,
    },
    {
      key: "report",
      label: <Link to="/report">Reports</Link>,
      icon: <FaChartPie size={20} />,
      style,
    },
    {
      key: "supplier",
      label: <Link to="/supplier">Suppliers</Link>,
      icon: <FaStore size={20} />,
      style,
    },
    {
      key: "order",
      label: <Link to="/order">Orders</Link>,
      icon: <FaClipboardList size={20} />,
      style,
    },
    {
      key: "manage-store",
      label: <Link to="/manage-store">Manage Store</Link>,
      icon: <RiSettingsFill size={20} />,
      style,
    },
  ];

  return (
    <Sider
      width={md ? 280 : showSidebar ? 230 : 0}
      theme="light"
      style={{
        height: "100vh",
        transition: "width 0.3s ease",
      }}
    >
      <Flex
        justify="center"
        align="center"
        style={{padding: 20, flexDirection: "column"}}
      >
        <Image
          width={md ? 180 : 150}
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
