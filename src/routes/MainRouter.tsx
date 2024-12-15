import {Grid, Layout} from "antd";
import HomeScreen from "../screens/HomeScreen";
import {Sidebar} from "../components/Sidebar";
import {Route, Routes} from "react-router-dom";

import {ReportScreen} from "../screens/ReportScreen";
import {SupplierScreen} from "../screens/SupplierScreen";
import {OrderScreen} from "../screens/OrderScreen";
import ManageStore from "../screens/ManageStore";
import HeaderBar from "../components/HeaderBar";
import {ProductScreen} from "../screens/ProductScreen";
import {CategoryScreen} from "../screens/CategoryScreen";

const {Content, Header} = Layout;

const MainRouter = () => {
  const {md} = Grid.useBreakpoint();

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header style={{backgroundColor: "#fff"}}>
          <HeaderBar />
        </Header>
        <Content
          style={{
            margin: md ? "10px" : 0,
            backgroundColor: "#fff",
            borderRadius: "6px",
            height: "100vh",
            overflow: "scroll",
          }}
        >
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/categories" element={<CategoryScreen />} />
            <Route path="/products" element={<ProductScreen />} />
            <Route path="/report" element={<ReportScreen />} />
            <Route path="/supplier" element={<SupplierScreen />} />
            <Route path="/order" element={<OrderScreen />} />
            <Route path="/manage-store" element={<ManageStore />} />
          </Routes>
          <div style={{height: "100px"}}></div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainRouter;
