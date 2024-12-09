/* eslint-disable @typescript-eslint/no-explicit-any */
import {Avatar, Typography} from "antd";
import {FaUser} from "react-icons/fa";
import ImageUploadButton from "./ImageUploadButton";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

type Props = {
  photoUrl: string | undefined;
  setPhotoUrl: any;
  itemSelected: any;
};

const UploadSingleImage = ({photoUrl, setPhotoUrl, itemSelected}: Props) => {
  const {isEditing} = useSelector((state: RootState) => state.data);

  return (
    <>
      <Typography.Text style={{fontWeight: "600"}}>Avatar</Typography.Text>
      {photoUrl ? (
        <Avatar size={100} src={photoUrl} />
      ) : isEditing ? (
        itemSelected?.photoUrl ? (
          <Avatar size={100} src={itemSelected?.photoUrl} />
        ) : (
          <Avatar size={100}>
            <FaUser size={50} />
          </Avatar>
        )
      ) : (
        <Avatar size={100}>
          <FaUser size={50} />
        </Avatar>
      )}
      <label htmlFor="photoUrl">
        <ImageUploadButton setImage={setPhotoUrl} />
      </label>
    </>
  );
};

export default UploadSingleImage;
