import {Button} from "antd";
import {FcGoogle} from "react-icons/fc";

const SocialLogin = () => {
  return (
    <>
      <Button size="large" type="default" block>
        <FcGoogle />
        Login with Google
      </Button>
    </>
  );
};

export default SocialLogin;
