import {Button, Divider, Flex, Form, Modal, Typography} from "antd";
import {
  CreateProductVariantType,
  ProductVariantType,
} from "../types/productVariantType";

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {deleteImage} from "../utils/deleteImageCloudinary";
import {baseService} from "../service/baseService";
import ListVariant from "./ListVariant";
import dayjs from "dayjs";
import {convertUrlToPublicId} from "../utils/convertUrlToPublicId";
import confirmAction from "../utils/confirmAction";
import {setIsConfirm} from "../redux/slice/dataSlice";
import VariantForm from "./forms/VariantForm";

const Variant = () => {
  const dispatch = useDispatch();

  const {productSelected} = useSelector((state: RootState) => state.data);

  const [form] = Form.useForm();

  const [photoUrl, setPhotoUrl] = useState<string>("");

  const [variants, setVariants] = useState<ProductVariantType[]>([]);

  const [variantSelected, setVariantSelected] = useState<ProductVariantType>();

  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {publicId} = useSelector(
    (state: RootState) => state.data.singleImageUploaded
  );

  const handleSubmit = async (values: CreateProductVariantType) => {
    setIsLoading(true);
    let response;
    if (!variantSelected) {
      response = await baseService.create("product-variants", {
        ...values,
        thumbnail: photoUrl,
        saleStartDate: values.saleStartDate?.startOf("day").format() || null,
        saleEndDate: values.saleEndDate?.endOf("day").format() || null,
        productId: productSelected.id,
      });
    } else {
      response = await baseService.update(
        "product-variants",
        variantSelected._id,
        {
          ...values,
          thumbnail: photoUrl,
          saleStartDate: values.saleStartDate?.startOf("day").format() || null,
          saleEndDate: values.saleEndDate?.endOf("day").format() || null,
          productId: productSelected.id,
        }
      );
    }
    if (response?.success) {
      if (variantSelected?.thumbnail) {
        await deleteImage(convertUrlToPublicId(variantSelected.thumbnail));
      }
      form.resetFields();
      setVariantSelected(undefined);
      setPhotoUrl("");
      setIsModalOpen(false);
      fetchVariants(productSelected.id);
      setIsLoading(false);
    }
  };

  const fetchVariants = async (productId: string) => {
    const response = await baseService.findAllVariants(
      "product-variants",
      productId
    );
    if (response?.success) {
      setVariants(response.data);
    }
  };

  const handleDeleteVariant = async (variantId: string) => {
    dispatch(setIsConfirm(true));
    confirmAction(async () => {
      await baseService.remove("product-variants", variantId);
      fetchVariants(productSelected.id);
    });
  };

  useEffect(() => {
    fetchVariants(productSelected.id);
  }, [productSelected.id]);

  useEffect(() => {
    if (variantSelected && isModalOpen) {
      setPhotoUrl(variantSelected.thumbnail || "");
      if (variantSelected.saleStartDate && variantSelected.saleEndDate) {
        form.setFieldsValue({
          ...variantSelected,
          saleStartDate: variantSelected.saleStartDate
            ? dayjs(variantSelected?.saleStartDate as unknown as Date)
            : null,
          saleEndDate: variantSelected.saleEndDate
            ? dayjs(variantSelected.saleEndDate as unknown as Date)
            : null,
        });
      } else {
        form.setFieldsValue(variantSelected);
      }
    } else {
      form.resetFields();
      setPhotoUrl("");
    }
  }, [isModalOpen, variantSelected]);

  return (
    <>
      <div>
        <Flex
          justify="space-between"
          align="center"
          style={{marginBottom: "20px"}}
        >
          <Typography.Title level={4}>Variants</Typography.Title>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Add Variant
          </Button>
        </Flex>
        <ListVariant
          variants={variants}
          setVariantSelected={setVariantSelected}
          setIsModalOpen={setIsModalOpen}
          handleDeleteVariant={handleDeleteVariant}
        />
        <Divider />
        <Modal
          open={isModalOpen}
          onCancel={async () => {
            setIsModalOpen(false);
            setVariantSelected(undefined);
            if (publicId) {
              await deleteImage(publicId);
            }
          }}
          footer={null}
          width={700}
          loading={isLoading}
        >
          <Typography.Title level={4}>Add Variant</Typography.Title>
          <VariantForm
            form={form}
            handleSubmit={handleSubmit}
            photoUrl={photoUrl}
            setPhotoUrl={setPhotoUrl}
          />
        </Modal>
      </div>
    </>
  );
};

export default Variant;
