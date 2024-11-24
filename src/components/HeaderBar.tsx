import {Avatar, Button, Col, Dropdown, Input, Row} from "antd";
import {useDispatch} from "react-redux";
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

const HeaderBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const {md} = Grid.useBreakpoint();

  const logout = async () => {
    await authService.logout();
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
            style={{display: md ? "none" : ""}}
          >
            <FaBars />
          </Button>
          <Input
            placeholder="Search"
            prefix={<FaSearch />}
            style={{display: md ? "" : "none"}}
          />
        </Col>
        <Col span={md ? 12 : 16}>
          <Row justify="end" align="middle">
            <Col span={md ? 2 : 6}>
              <Button>
                <FaBell />
              </Button>
            </Col>
            <Col
              span={md ? 2 : 6}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Dropdown menu={{items}} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar
                    src={
                      <img src={"https://i.pravatar.cc/150?u=1"} alt="avatar" />
                    }
                    size="large"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  />
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
