/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useState} from "react";

import type {UploadProps} from "antd";
import {message, Upload, Button} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {setSingleImageUploaded} from "../redux/slice/dataSlice";

type ImageUploadProps = {
  setImage: any;
};

const ImageUploadButton = ({setImage}: ImageUploadProps) => {
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState<string>();

  const props: UploadProps = {
    name: "file",
    customRequest: async (options) => {
      const {file, onSuccess, onError, filename} = options;

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

        message.loading({
          content: `${filename} uploading...`,
          key: "uploading",
        });
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();
        onSuccess?.(result);
        dispatch(setSingleImageUploaded({publicId: result.public_id}));
        // Thêm URL mới vào state
        setImageUrl(result.secure_url);
        message.success(`${filename} uploaded successfully`);
      } catch (error) {
        onError?.(error as Error);
        message.error(`${filename} upload failed`);
      }
    },
    onChange(info) {
      const {status} = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove: () => {
      // setImage((prev) =>
      //   prev.filter((url) => url !== file.response.secure_url)
      // );
    },
  };

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);

  return (
    <div>
      <Upload {...props} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
};

export default ImageUploadButton;
