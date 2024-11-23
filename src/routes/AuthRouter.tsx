import {Route, Routes} from "react-router-dom";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import {Col, Flex, Image, Row, Typography} from "antd";
import {Grid} from "antd";

const AuthRouter = () => {
  const {md} = Grid.useBreakpoint();

  return (
    <Row
      align="middle"
      gutter={[
        {xs: 16, sm: 16},
        {xs: 32, sm: 16},
      ]}
      style={{
        minHeight: md ? "100vh" : "auto",
        padding: md ? 0 : "50px 0 50px 0",
        overflow: "auto",
        maxHeight: "100vh",
      }}
    >
      <Col xs={{span: 24}} md={{span: 12}} className="center">
        <Flex align="center" justify="center" style={{flexDirection: "column"}}>
          <Image
            width={md ? 500 : 200}
            src="https://res.cloudinary.com/dveqjgj4l/image/upload/v1732279680/simplestore/b36kpr0fsiljodfmsoaj.png"
            preview={false}
          />
          <Typography.Title level={md ? 1 : 3} style={{fontWeight: 700}}>
            Admin Panel
          </Typography.Title>
        </Flex>
      </Col>
      <Col
        xs={{
          span: 24,
        }}
        md={{
          span: 12,
        }}
        className="center"
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Col>
    </Row>
  );
};

export default AuthRouter;
