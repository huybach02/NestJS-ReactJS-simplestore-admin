/* eslint-disable @typescript-eslint/no-explicit-any */
import {Flex, Select, TreeSelect} from "antd";
import Search from "antd/es/input/Search";
import {useSearchParams} from "react-router-dom";

export const FilterGroup = ({
  filter,
  setFilter,
  otherFilter,
  hasFilterCategory,
}: {
  filter: any;
  setFilter: any;
  otherFilter?: any;
  hasFilterCategory?: {
    isShow: boolean;
    options: any;
  };
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Flex
      justify="start"
      align="center"
      gap={10}
      style={{padding: "10px 0px 5px 20px"}}
      wrap
    >
      <Search
        defaultValue={searchParams.get("search") || ""}
        placeholder="Type to search"
        onSearch={(value) => setFilter({...filter, search: value})}
        style={{width: 200}}
      />
      <Select
        defaultValue={searchParams.get("sort") || "createdAt_desc"}
        style={{width: 150}}
        onChange={(value) => setFilter({...filter, sort: value})}
        options={[
          {value: "createdAt_desc", label: "Sort by Newest"},
          {value: "createdAt_asc", label: "Sort by Oldest"},
          {value: "name_asc", label: "Sort by Name A-Z"},
          {value: "name_desc", label: "Sort by Name Z-A"},
        ]}
      />
      <Select
        defaultValue={
          searchParams.get("active")
            ? searchParams.get("active") === "true"
            : ""
        }
        style={{width: 130}}
        onChange={(value) => setFilter({...filter, active: value})}
        options={[
          {value: "", label: "Status: All"},
          {value: true, label: "Status: Active"},
          {value: false, label: "Status: Inactive"},
        ]}
      />
      {otherFilter &&
        otherFilter.map((item: any) => (
          <Select
            defaultValue={item.defaultValue}
            onChange={(value) => setFilter({...filter, [item.key]: value})}
            options={item.options}
            style={{width: item.width || 120}}
          />
        ))}
      {hasFilterCategory && hasFilterCategory.isShow && (
        <TreeSelect
          treeData={[{title: "All", value: ""}, ...hasFilterCategory.options]}
          placeholder="Filter by category"
          treeDefaultExpandAll
          style={{width: "400px"}}
          onChange={(value) => setFilter({...filter, category: value})}
        />
      )}
    </Flex>
  );
};
