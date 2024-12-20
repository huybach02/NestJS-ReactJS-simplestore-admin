import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Grid,
  Input,
  Typography,
} from "antd";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import {LoginType} from "../../types/authType";
import {authService} from "../../service/authService";
import {setUser} from "../../redux/slice/userSlice";
import {useDispatch} from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {md} = Grid.useBreakpoint();

  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values: LoginType) => {
    try {
      setIsLoading(true);
      const response = await authService.login({
        ...values,
        remember: isRemember,
      });
      if (response?.success) {
        dispatch(setUser(response?.data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card style={{width: md ? 500 : "95%"}}>
        <Typography.Title level={1} style={{textAlign: "center"}}>
          Login
        </Typography.Title>
        <Typography.Title level={4} style={{textAlign: "center"}}>
          Welcome back to SimpleStore!
        </Typography.Title>
        <Typography.Paragraph style={{textAlign: "center"}}>
          Please enter your email and password to continue.
        </Typography.Paragraph>

        <Form
          layout="vertical"
          form={form}
          size="large"
          onFinish={onFinish}
          disabled={isLoading}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{required: true, message: "Email is required"}]}
            initialValue={"bach@gmail.com"}
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{required: true, message: "Password is required"}]}
            initialValue={"password"}
          >
            <Input.Password placeholder="********" />
          </Form.Item>
          <Flex justify="space-between">
            <Form.Item>
              <Checkbox
                checked={isRemember}
                onChange={(e) => setIsRemember(e.target.checked)}
              >
                Remember me for 30 days
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Link to="/forgot-password">Forgot password?</Link>
            </Form.Item>
          </Flex>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
              block
            >
              Login
            </Button>
          </Form.Item>
          <SocialLogin />
          <Flex justify="center" gap={5} style={{marginTop: 16}}>
            <Typography.Text>Don't have an account?</Typography.Text>
            <Link to="/register">Register</Link>
          </Flex>
        </Form>
      </Card>
    </>
  );
};

export default Login;
