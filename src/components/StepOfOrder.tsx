import {Button, Steps} from "antd";
import {OrderType} from "../types/orderType";
import {baseService} from "../service/baseService";
import {setCloseModal} from "../redux/slice/dataSlice";
import {useDispatch} from "react-redux";

export const StepOfOrder = ({
  order,
  handleGetData,
}: {
  order: OrderType | undefined;
  handleGetData: () => void;
}) => {
  const dispatch = useDispatch();

  const handleChangeStatus = async (nextStatus: string) => {
    await baseService.updateOrderStatus("orders", order?._id || "", {
      orderStatus: nextStatus,
    });
    handleGetData();
    dispatch(setCloseModal());
  };

  const currentStatus = order?.orderStatus || "confirmed";

  const getNextStatus = (current: string) => {
    switch (current) {
      case "confirmed":
        return "processing";
      case "processing":
        return "shipping";
      case "shipping":
        return "completed";
      default:
        return null;
    }
  };

  const getActionButton = (status: string) => {
    const nextStatus = getNextStatus(currentStatus);
    if (
      status === currentStatus &&
      nextStatus &&
      currentStatus !== "completed" &&
      currentStatus !== "cancelled"
    ) {
      const buttonText = {
        processing: "Move to Processing",
        shipping: "Move to Shipping",
        completed: "Mark as Completed",
      }[nextStatus];

      return (
        <Button
          type="primary"
          size="large"
          onClick={() => handleChangeStatus(nextStatus)}
        >
          {buttonText}
        </Button>
      );
    }
    return null;
  };

  return (
    <Steps
      current={
        order?.orderStatus === "confirmed"
          ? 0
          : order?.orderStatus === "processing"
          ? 1
          : order?.orderStatus === "shipping"
          ? 2
          : order?.orderStatus === "completed"
          ? 3
          : order?.orderStatus === "cancelled"
          ? 4
          : 0
      }
      items={[
        {
          title: "Confirmed",
          description: getActionButton("confirmed"),
        },
        {
          title: "Processing",
          description: getActionButton("processing"),
        },
        {
          title: "Shipping",
          description: getActionButton("shipping"),
        },
        {
          title: "Completed",
          description: getActionButton("completed"),
        },
        {
          title: "Cancelled",
          description: null,
        },
      ]}
      style={{margin: "20px 0"}}
    />
  );
};
