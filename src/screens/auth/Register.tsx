import {Button, Card, Flex, Form, Grid, Input, Typography} from "antd";
import {Link, useNavigate} from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import {useState} from "react";
import {RegisterType} from "../../types/authType";
import {authService} from "../../service/authService";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/slice/userSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {md} = Grid.useBreakpoint();

  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values: RegisterType) => {
    try {
      setIsLoading(true);
      const response = await authService.register(values);
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
    <Card style={{width: md ? 500 : "95%"}}>
      <Typography.Title level={1} style={{textAlign: "center"}}>
        Register
      </Typography.Title>
      <Typography.Title level={4} style={{textAlign: "center"}}>
        Welcome to SimpleStore!
      </Typography.Title>
      <Typography.Paragraph style={{textAlign: "center"}}>
        Please enter your information to continue.
      </Typography.Paragraph>

      <Form
        layout="vertical"
        size="large"
        form={form}
        onFinish={onFinish}
        disabled={isLoading}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{required: true, message: "Name is required"}]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{required: true, message: "Email is required"}]}
        >
          <Input placeholder="example@gmail.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {required: true, message: "Password is required"},
            {min: 8, message: "Password must be at least 8 characters long"},
          ]}
        >
          <Input.Password placeholder="********" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            {required: true, message: "Confirm password is required"},
            ({getFieldValue}) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
              },
            }),
          ]}
        >
          <Input.Password placeholder="********" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
            block
          >
            Register
          </Button>
        </Form.Item>
        <SocialLogin />
        <Flex justify="center" gap={5} style={{marginTop: 16}}>
          <Typography.Text>Already have an account?</Typography.Text>
          <Link to="/">Login</Link>
        </Flex>
      </Form>
    </Card>
  );
};

export default Register;
