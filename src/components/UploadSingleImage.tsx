/* eslint-disable @typescript-eslint/no-explicit-any */
import {Avatar, Grid, Typography} from "antd";
import {FaImage} from "react-icons/fa";
import ImageUploadButton from "./ImageUploadButton";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

type Props = {
  title: string;
  photoUrl: string | undefined;
  setPhotoUrl: any;
  oldImage?: any;
};

const UploadSingleImage = ({
  title = "Avatar",
  photoUrl,
  setPhotoUrl,
  oldImage,
}: Props) => {
  const {isEditing} = useSelector((state: RootState) => state.data);

  const {lg} = Grid.useBreakpoint();

  return (
    <>
      <Typography.Text style={{fontWeight: "600"}}>{title}</Typography.Text>
      {photoUrl ? (
        <Avatar size={lg ? 100 : 70} src={photoUrl} shape="square" />
      ) : isEditing ? (
        oldImage ? (
          <Avatar size={lg ? 100 : 70} src={oldImage} shape="square" />
        ) : (
          <Avatar size={lg ? 100 : 70} shape="square">
            <FaImage size={lg ? 50 : 30} />
          </Avatar>
        )
      ) : (
        <Avatar size={lg ? 100 : 70} shape="square">
          <FaImage size={lg ? 50 : 30} />
        </Avatar>
      )}
      <label htmlFor="photoUrl">
        <ImageUploadButton setImage={setPhotoUrl} />
      </label>
    </>
  );
};

export default UploadSingleImage;
