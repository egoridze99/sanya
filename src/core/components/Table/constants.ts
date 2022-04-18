import {Column} from "./types";

export const CHECKBOX_COLUMN_WIDTH = 38;
export const checkColumn: Column<any> = {
  key: "table-check",
  dataKey: "table-check",
  title: "",
  hideOptions: true,
  sticky: "left",
  unalterable: true,
  sortable: false
};

export const EXPAND_GROUPS_COLUMN_WIDTH = 38;
export const expandGroupsColumn: Column<any> = {
  key: "table-expand-groups",
  dataKey: "table-expand-groups",
  title: "",
  hideOptions: true,
  sticky: "left",
  unalterable: true,
  sortable: false
};
