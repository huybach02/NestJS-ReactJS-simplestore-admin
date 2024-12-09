/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useState} from "react";
import {InboxOutlined} from "@ant-design/icons";
import type {UploadProps} from "antd";
import {message, Upload, Image} from "antd";

const {Dragger} = Upload;

type ImageUploadProps = {
  multiple?: boolean | undefined;
  setImageLists: any;
  width?: string;
};

const ImageUploadZone = ({
  setImageLists,
  multiple = false,
  width,
}: ImageUploadProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const props: UploadProps = {
    name: "file",
    multiple: multiple,
    customRequest: async (options) => {
      const {file, onSuccess, onError, filename} = options;

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dveqjgj4l/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();
        onSuccess?.(result);
        // Thêm URL mới vào state
        setImageUrls((prev) => [...prev, result.secure_url]);
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
    onRemove: (file) => {
      setImageUrls((prev) =>
        prev.filter((url) => url !== file.response.secure_url)
      );
    },
  };

  useEffect(() => {
    setImageLists(imageUrls);
  }, [imageUrls]);

  return (
    <div>
      <Dragger {...props} style={width ? {width: width} : {}}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag image(s) here</p>
      </Dragger>

      {/* Phần preview ảnh */}
      {imageUrls.length > 0 && (
        <div style={{marginTop: 20}}>
          <h3>Uploaded Images:</h3>
          <Image.PreviewGroup>
            <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
              {imageUrls.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  width={100}
                  height={100}
                  style={{objectFit: "cover"}}
                />
              ))}
            </div>
          </Image.PreviewGroup>
        </div>
      )}
    </div>
  );
};

export default ImageUploadZone;
