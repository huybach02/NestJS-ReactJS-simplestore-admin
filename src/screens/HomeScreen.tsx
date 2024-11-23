import {Button} from "antd";
import {useDispatch} from "react-redux";
import {authService} from "../service/authService";
import {removeUser} from "../redux/slice/userSlice";
import {useNavigate} from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    await authService.logout();
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <>
      <Button type="primary" onClick={() => logout()}>
        Logout
      </Button>
    </>
  );
};

export default HomeScreen;
