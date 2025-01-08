import {useEffect, useState} from "react";
import QuillEditor from "./QuillEditor";
import {Button} from "antd";
import {Flex} from "antd";
import {baseService} from "../service/baseService";

const AboutUsContentManage = () => {
  const [content, setContent] = useState("");

  const handleSave = async () => {
    await baseService.manageWebsite("aboutUsContent", {
      aboutUsContent: content,
    });
  };

  const fetchAboutUsContent = async () => {
    const response = await baseService.getManageWebsite("aboutUsContent");
    setContent(response.data);
  };

  useEffect(() => {
    fetchAboutUsContent();
  }, []);

  return (
    <div>
      <Flex justify="end" align="center" style={{marginBottom: "20px"}}>
        <Button type="primary" size="large" onClick={handleSave}>
          Save
        </Button>
      </Flex>
      <QuillEditor value={content} onChange={setContent} />
    </div>
  );
};

export default AboutUsContentManage;
