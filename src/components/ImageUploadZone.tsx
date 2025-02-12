/* eslint-disable @typescript-eslint/no-explicit-any */
import {InboxOutlined} from "@ant-design/icons";
import type {UploadProps} from "antd";
import {message, Upload, Image, Flex, Button} from "antd";
import {FiTrash2} from "react-icons/fi";
import {setMultipleImageUploaded} from "../redux/slice/dataSlice";
import {useDispatch, useSelector} from "react-redux";
import {deleteImage} from "../utils/deleteImageCloudinary";
import {RootState} from "../redux/store";

const {Dragger} = Upload;

type ImageUploadProps = {
  title?: string;
  multiple?: boolean | undefined;
  setImageLists: any;
  width?: string;
  style?: React.CSSProperties;
  imageLists?: string[];
};

const ImageUploadZone = ({
  title,
  setImageLists,
  multiple = false,
  width,
  style,
  imageLists,
}: ImageUploadProps) => {
  const dispatch = useDispatch();

  const {isEditing} = useSelector((state: RootState) => state.data);

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
        setImageLists((prev: any) => [...prev, result.secure_url]);
        dispatch(setMultipleImageUploaded({publicId: result.public_id}));
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
    onRemove: async (file) => {
      await deleteImage(file.response.public_id);
      handleRemoveImage(file.response.secure_url);
    },
  };

  const handleRemoveImage = (url: string) => {
    setImageLists((prev: any) => prev.filter((u: any) => u !== url));
  };

  return (
    <div style={style}>
      <div style={{fontSize: 14, fontWeight: 500, marginBottom: 10}}>
        {title}
      </div>
      <Dragger {...props} style={width ? {width: width} : {}}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag image(s) here</p>
      </Dragger>

      {/* Phần preview ảnh */}
      {imageLists && imageLists.length > 0 && (
        <div style={{marginTop: 20}}>
          <h3 style={{fontSize: 16, fontWeight: 500, marginBottom: 10}}>
            Uploaded Images:
          </h3>
          <Image.PreviewGroup>
            <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
              {imageLists?.map((url, index) => (
                <Flex key={index} vertical align="center" gap={10}>
                  <Image
                    src={url}
                    width={100}
                    height={100}
                    style={{objectFit: "cover", borderRadius: 10}}
                  />
                  {isEditing && (
                    <Button
                      icon={<FiTrash2 />}
                      danger
                      onClick={() => handleRemoveImage(url)}
                    />
                  )}
                </Flex>
              ))}
            </div>
          </Image.PreviewGroup>
        </div>
      )}
    </div>
  );
};

export default ImageUploadZone;
