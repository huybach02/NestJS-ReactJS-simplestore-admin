import {Flex} from "antd";
import {ScaleLoader} from "react-spinners";

export const Loading = () => {
  return (
    <Flex justify="center" align="center" style={{height: "100vh"}}>
      <ScaleLoader color="#000" />
    </Flex>
  );
};
