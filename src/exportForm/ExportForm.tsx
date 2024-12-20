import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Flex,
  List,
  Space,
  Typography,
} from "antd";
import {exportCheckbox} from "../utils/exportCheckbox";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setExportFields} from "../redux/slice/dataSlice";

const ExportForm = ({endpoint}: {endpoint: string}) => {
  const dispatch = useDispatch();

  const {exportFields} = useSelector((state: RootState) => state.data);

  const handleSelectAll = () => {
    if (exportFields.fields.length === exportCheckbox[endpoint].length) {
      dispatch(setExportFields({...exportFields, fields: []}));
    } else {
      dispatch(
        setExportFields({
          ...exportFields,
          fields: exportCheckbox[endpoint].map((item) => item.value),
        })
      );
    }
  };
  const handleSelect = (e: CheckboxChangeEvent, value: string) => {
    if (e.target.checked) {
      dispatch(
        setExportFields({
          ...exportFields,
          fields: [...exportFields.fields, value],
        })
      );
    } else {
      dispatch(
        setExportFields({
          ...exportFields,
          fields: exportFields.fields.filter((item) => item !== value),
        })
      );
    }
  };

  return (
    <div style={{marginTop: 30}}>
      <Space size={16}>
        <Flex align="center" gap={10}>
          <DatePicker.RangePicker
            onChange={(value) => {
              if (value && value[0] && value[1]) {
                dispatch(
                  setExportFields({
                    ...exportFields,
                    date: [
                      value[0].startOf("day").format(),
                      value[1].endOf("day").format(),
                    ],
                  })
                );
              } else {
                dispatch(setExportFields({...exportFields, date: []}));
              }
            }}
            disabled={exportFields.isAllDate}
            allowEmpty={[true, true]}
          />
        </Flex>
        <Button
          onClick={() =>
            dispatch(
              setExportFields({
                ...exportFields,
                isAllDate: !exportFields.isAllDate,
              })
            )
          }
          type={exportFields.isAllDate ? "primary" : "default"}
        >
          Export all date
        </Button>
      </Space>
      <Divider />
      <Flex align="center" justify="space-between">
        <Typography.Title level={5}>Select columns to export</Typography.Title>
        <Button onClick={handleSelectAll}>Select all</Button>
      </Flex>
      <List
        dataSource={exportCheckbox[endpoint]}
        renderItem={(item) => (
          <List.Item>
            <Checkbox
              value={item.value}
              checked={exportFields.fields.includes(item.value)}
              onChange={(e) => handleSelect(e, item.value)}
            >
              {item.label}
            </Checkbox>
          </List.Item>
        )}
        style={{marginTop: 20}}
      ></List>
    </div>
  );
};

export default ExportForm;
