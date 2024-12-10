import {utils, writeFileXLSX} from "xlsx";
import {baseService} from "../service/baseService";
import {message} from "antd";

export const exportExcel = async (
  endpoint: string,
  title: string,
  exportFields: {fields: string[]; date: string[]; isAllDate: boolean}
) => {
  if (exportFields.date.length === 0 && !exportFields.isAllDate) {
    message.error("Please select date to export");
    return;
  }
  if (exportFields.fields.length === 0) {
    message.error("Please select at least one column to export");
    return;
  }
  const response = await baseService.download(endpoint, exportFields);
  const ws = utils.json_to_sheet(response.data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "data");
  writeFileXLSX(wb, `${title}-${Date.now()}.xlsx`);
};
