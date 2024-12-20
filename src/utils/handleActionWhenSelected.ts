import {baseService} from "../service/baseService";

export const handleActionWhenSelected = async (
  endpoint: string,
  key: string,
  selectedRowKeys: React.Key[] | undefined,
  handleGetData: (() => void) | undefined,
  setSelectedRowKeys: ((selectedRowKeys: React.Key[]) => void) | undefined
) => {
  switch (key) {
    case "1":
      await baseService.actionWhenSelected(endpoint, {
        action: "active-all",
        ids: selectedRowKeys,
      });
      handleGetData?.();
      break;
    case "2":
      await baseService.actionWhenSelected(endpoint, {
        action: "inactivate-all",
        ids: selectedRowKeys,
      });
      handleGetData?.();
      break;
    default:
      await baseService.actionWhenSelected(endpoint, {
        action: "delete-all",
        ids: selectedRowKeys,
      });
      handleGetData?.();
      break;
  }
  setSelectedRowKeys?.([]);
};
