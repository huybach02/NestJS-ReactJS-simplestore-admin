import {Alert, Flex, Grid, Tabs} from "antd";
import React from "react";
import {BiCarousel, BiMessageAltDetail, BiWindows} from "react-icons/bi";
import HomeSliderManage from "../components/HomeSliderManage";
import HomeCommitmentManage from "../components/HomeCommitmentManage";
import QuestionAndAnswerManage from "../components/QuestionAndAnswerManage";
import AboutUsContentManage from "../components/AboutUsContentManage";
import {MdContentPaste} from "react-icons/md";

const Profile = () => {
  const {lg} = Grid.useBreakpoint();

  const [activeTab, setActiveTab] = React.useState(
    sessionStorage.getItem("activeTab") || "home-slider"
  );

  const tabItems = [
    {
      label: "Home Slider",
      key: "home-slider",
      icon: <BiCarousel size={20} />,
      children: <HomeSliderManage />,
    },
    {
      label: "Home Commitment",
      key: "home-commitment",
      icon: <BiWindows size={20} />,
      children: <HomeCommitmentManage />,
    },
    {
      label: "Product Question & Answer",
      key: "product-question-answer",
      icon: <BiMessageAltDetail size={20} />,
      children: <QuestionAndAnswerManage />,
    },
    {
      label: "About Us Content",
      key: "about-us-content",
      icon: <MdContentPaste size={20} />,
      children: <AboutUsContentManage />,
    },
  ];

  return (
    <>
      <Alert
        message="All change will be updated automatically on Website after 30s."
        type="info"
        showIcon
        style={{margin: "20px"}}
      />
      <Flex style={{padding: lg ? "20px 40px" : "20px 20px", width: "100%"}}>
        <Tabs
          tabPosition={"top"}
          items={tabItems}
          size="middle"
          activeKey={activeTab as string}
          onTabClick={(key) => {
            setActiveTab(key);
            sessionStorage.setItem("activeTab", key);
          }}
          style={{width: "100%"}}
        />
      </Flex>
    </>
  );
};

export default Profile;
