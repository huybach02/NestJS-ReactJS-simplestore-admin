import {Avatar, Button, Col, Dropdown, Input, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setShowSidebar} from "../redux/slice/dataSlice";
import {
  FaBars,
  FaBell,
  FaCog,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import {Grid} from "antd";
import {MenuProps} from "antd";
import {useNavigate} from "react-router-dom";
import {removeUser} from "../redux/slice/userSlice";
import {authService} from "../service/authService";
import {RootState} from "../redux/store";
import {signOut} from "firebase/auth";
import {firebaseAuth} from "../firebase/firebaseConfig";

const HeaderBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {showSidebar} = useSelector((state: RootState) => state.data);
  const {user} = useSelector((state: RootState) => state.user);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
      icon: <FaUser />,
    },
    {
      key: "3",
      label: "Settings",
      icon: <FaCog />,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "Logout",
      icon: <FaSignOutAlt />,
      style: {color: "red", fontWeight: "bold", width: "100px"},
      onClick: () => {
        logout();
      },
    },
  ];

  const {lg} = Grid.useBreakpoint();

  const logout = async () => {
    await authService.logout();
    signOut(firebaseAuth);
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div>
      <Row justify="space-between">
        <Col span={4}>
          <Button
            size="middle"
            onClick={() => dispatch(setShowSidebar())}
            style={{display: lg ? "none" : ""}}
          >
            <FaBars />
          </Button>
          <Input
            placeholder="Search"
            prefix={<FaSearch />}
            style={{display: lg ? "" : "none"}}
          />
        </Col>
        <Col span={lg ? 12 : 16} style={{display: showSidebar ? "none" : ""}}>
          <Row justify="end" align="middle">
            <Col span={lg ? 2 : 6}>
              <Button>
                <FaBell />
              </Button>
            </Col>
            <Col
              span={lg ? 2 : 6}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Dropdown menu={{items}} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar src={user?.avatar} icon={<FaUser />} size="large" />
                </a>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderBar;
