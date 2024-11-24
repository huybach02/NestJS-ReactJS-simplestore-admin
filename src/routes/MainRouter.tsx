import {Layout} from "antd";
import HomeScreen from "../screens/HomeScreen";
import {Sidebar} from "../components/Sidebar";
import {Route, Routes} from "react-router-dom";
import InventoryScreen from "../screens/InventoryScreen";
import {ReportScreen} from "../screens/ReportScreen";
import {SupplierScreen} from "../screens/SupplierScreen";
import {OrderScreen} from "../screens/OrderScreen";
import ManageStore from "../screens/ManageStore";
import {Suspense} from "react";
import HeaderBar from "../components/HeaderBar";

const {Content, Header, Footer} = Layout;

const MainRouter = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header style={{backgroundColor: "#fff"}}>
          <HeaderBar />
        </Header>
        <Content>
          <Suspense fallback={<div></div>}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/inventory" element={<InventoryScreen />} />
              <Route path="/report" element={<ReportScreen />} />
              <Route path="/supplier" element={<SupplierScreen />} />
              <Route path="/order" element={<OrderScreen />} />
              <Route path="/manage-store" element={<ManageStore />} />
            </Routes>
          </Suspense>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default MainRouter;
