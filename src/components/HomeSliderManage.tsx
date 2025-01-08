/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Grid,
  Image,
  Input,
  Modal,
  Row,
  Typography,
} from "antd";
import {useEffect, useState} from "react";
import UploadSingleImage from "./UploadSingleImage";
import TextArea from "antd/es/input/TextArea";
import {baseService} from "../service/baseService";
import {Link} from "react-router-dom";
import {RiDeleteBinLine, RiDragMove2Fill, RiEdit2Fill} from "react-icons/ri";
import {ReactSortable, SortableEvent} from "react-sortablejs";
import confirmAction from "../utils/confirmAction";

interface AddSliderForm {
  title: string;
  description: string;
  btnText: string;
  btnLink: string;
}

const HomeSliderManage = () => {
  const {lg} = Grid.useBreakpoint();

  const [open, setOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [homeSlider, setHomeSlider] = useState<any[]>([]);
  const [itemSelected, setItemSelected] = useState<any>(null);
  const [indexSelected, setIndexSelected] = useState<number | null>(null);

  const [form] = Form.useForm();

  const handleSubmit = async (values: AddSliderForm) => {
    if (indexSelected !== null) {
      homeSlider[indexSelected] = {
        ...homeSlider[indexSelected],
        ...values,
        image: photoUrl,
      };
      await updateSliderOrder(homeSlider);
    } else {
      await baseService.manageWebsite("homeSlider", {
        homeSlider: {
          ...values,
          image: photoUrl,
        },
      });
    }
    fetchHomeSlider();
    form.resetFields();
    setPhotoUrl("");
  };

  const fetchHomeSlider = async () => {
    const response = await baseService.getManageWebsite("homeSlider");
    setHomeSlider(response.data);
  };

  const updateSliderOrder = async (newData: any) => {
    await baseService.updateManageWebsite("homeSlider", newData);
    fetchHomeSlider();
  };

  const handleDeleteSlider = async (index: number) => {
    confirmAction(async () => {
      homeSlider.splice(index, 1);
      await updateSliderOrder(homeSlider);
    });
  };

  useEffect(() => {
    fetchHomeSlider();
  }, []);

  useEffect(() => {
    if (itemSelected) {
      form.setFieldsValue(itemSelected);
    }
  }, [itemSelected]);

  return (
    <>
      <Flex justify="end">
        <Button type="primary" onClick={() => setOpen(true)}>
          Add New Slider
        </Button>
      </Flex>
      <Flex vertical gap={20} style={{width: "100%", marginTop: 50}}>
        <div style={{minHeight: "2000px"}}>
          <ReactSortable
            list={homeSlider}
            setList={setHomeSlider}
            animation={200}
            onEnd={(evt: SortableEvent) => {
              const newList = [...homeSlider];
              const [removed] = newList.splice(evt.oldIndex!, 1);
              newList.splice(evt.newIndex!, 0, removed);
              updateSliderOrder(newList);
            }}
          >
            {homeSlider.map((slider: any, index: number) => (
              <Flex key={slider.id} style={{width: "100%"}}>
                <Card style={{width: "100%", marginBottom: 20}}>
                  <Row gutter={[16, 16]}>
                    <Col span={1} style={{cursor: "grab", display: "flex"}}>
                      <Flex vertical align="center" justify="center">
                        <RiDragMove2Fill size={24} />
                      </Flex>
                    </Col>
                    <Col span={lg ? 4 : 24}>
                      <Image
                        width={"100%"}
                        src={slider.image}
                        alt={slider.title}
                      />
                    </Col>
                    <Col span={lg ? 18 : 24}>
                      <Flex vertical gap={10}>
                        <Typography.Title level={5}>
                          <b>{slider.title}</b>
                        </Typography.Title>
                        <Typography.Text>
                          <b>Description: </b>
                          {slider.description}
                        </Typography.Text>
                        <Typography.Text>
                          <b>Button Text: </b>
                          {slider.btnText}
                        </Typography.Text>
                        <Typography.Text>
                          <b>Button Link: </b>
                          <Link to={slider.btnLink}>{slider.btnLink}</Link>
                        </Typography.Text>
                      </Flex>
                    </Col>
                    <Col span={1}>
                      <Flex vertical justify="end" gap={10}>
                        <Button
                          type="default"
                          onClick={() => {
                            setOpen(true);
                            setTimeout(() => {
                              setItemSelected(slider);
                              setIndexSelected(index);
                              setPhotoUrl(slider.image);
                            }, 100);
                          }}
                          icon={<RiEdit2Fill />}
                        />
                        <Button
                          type="primary"
                          danger
                          icon={<RiDeleteBinLine />}
                          onClick={() => {
                            handleDeleteSlider(index);
                          }}
                        />
                      </Flex>
                    </Col>
                  </Row>
                </Card>
              </Flex>
            ))}
          </ReactSortable>
        </div>
      </Flex>
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
          setItemSelected(null);
          setIndexSelected(null);
          form.resetFields();
          setPhotoUrl("");
        }}
        onOk={() => {
          form.submit();
          setOpen(false);
        }}
        title="Add New Slider"
      >
        <Flex align="center" gap={20} style={{marginBottom: 20}}>
          <UploadSingleImage
            title="Slider Image"
            photoUrl={photoUrl}
            setPhotoUrl={setPhotoUrl}
          />
        </Flex>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Button Text" name="btnText">
            <Input />
          </Form.Item>
          <Form.Item label="Button Link" name="btnLink">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HomeSliderManage;
