import React, {MutableRefObject, ReactNode, ReactText} from "react";

import {ArrayElement} from "src/core/core.types";
import {CheckBoxProps} from "../CheckBox";
import {MultiSelectItem} from "../MultiSelect";

/* eslint-disable @typescript-eslint/no-explicit-any */

export enum FilterFunctionType {
  TEXT = "text",
  RANGE = "range",
  MULTISELECT = "multiselect",
  CUSTOM = "custom"
}

export type TableSortItem<T> = [keyof T, "asc" | "desc"];

export type Column<T> = {
  key: string;
  title?: string;
  dataKey: string;
  render?: (
    keyData: any,
    dataItem: T,
    onDataItemChange?: (item: T) => void
  ) => ReactNode;
  headerRender?: (title: string) => any;
  sortable?: boolean;
  exportData?: ((el: any, item: T) => string) | false;
  width?: string;
  nohint?: boolean;
  collapseTag?: string;
  collapsePos?: "end" | "start" | "middle";
  sticky?: "left" | "right";
  shift?: number;
  sortFunction?: (keyData: any, dataItem: T) => any;
  filterFunctionType?: FilterFunctionType;
  customFilterFunction?: (keyData: any, filterData?: any) => void;
  hideOptions?: boolean;
  mainTagColumn?: boolean;
  group?: string;
  hasRightBorder?: boolean;
  unalterable?: boolean;
  filterData?: () => any[];
  resizeable?: boolean;
  headerColor?: HeaderColors;
  textAlign?:
    | "left"
    | "right"
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "center"
    | "end"
    | "justify"
    | "match-parent"
    | "start"
    | undefined;
};

export enum HeaderColors {
  red = "#FAF4FE",
  blue = "#F6F9FF",
  green = "#F5FFEF"
}

export type TableProps<T = any> = {
  columns: Column<T>[];
  data: T[];
  pagination?: boolean;
  defaultItemsOnPage?: number;
  onItemsOnPageChange?: (itemsOnPage: number) => void;
  sortBy?: TableSortItem<T>[];
  onClickRow?: (item: T) => void;
  onChangeSelectedRows?: (rows: T[]) => void;
  onItemChange?: (prev: T, item: T) => void;
  selectedRows?: T[];
  selectable?: boolean;
  defaultColumnsVisible?: string[];
  uqKey: (() => string) | string;
  multiline?: boolean;
  rowsHeight?: number;
  header?: boolean;
  smallHeader?: boolean;
  height?: string;
  selectColumnsVisible?: boolean;
  footerRender?: () => any;
  selectedEditorRowRender?: () => any;
  // Синхронизация пагинации
  unionPage?: number;
  onPageChange?: (page: number) => void;
  // Синхронизация сортировки
  sorted?: any[];
  onSortChange?: (items: any[]) => void;
  // Синхронизация фильтрации
  filtered?: {
    [x: string]: {value: any; options: any};
  };
  onFilterChange?: (item: {[x: string]: {value: any; options: any}}) => void;
  // Синхронизация скроллов
  onScroll?: (top: number, left: number) => void;
  scrollX?: number;
  scrollY?: number;
  innerRef?: MutableRefObject<HTMLDivElement | null>;
  className?: string;
  paginationPosition?: "top" | "bottom";
  onVisibleColumnChange?: (data: string[]) => void;
  tableId?: string;
  // Создать узел который заполнит пустую ширину таблицы
  fillRow?: boolean;
  rowGroupProps?: RowGroupProps<{name: string} & Record<string, any>>;
  rowColorFieldName?: string;
};

export type TextFilterProps = {
  onFilterChange: (filt: {value?: string; options?: string}) => void;
  filter?: {value?: string; options?: string};
  filterTitle?: string;
  filterPlaceholder?: string;
};

export type RangeFilterType = {
  onFilterChange: (filt: {value?: [number?, number?]}) => void;
  filter?: {value?: [number?, number?]};
  filterTitle?: string;
  filterData: [number, number];
};

export type MultiselectFilterType = {
  onFilterChange: (filt: {value?: ReactText[]}) => void;
  filter?: {value?: ReactText[]};
  filterTitle?: string;
  filterData: MultiSelectItem[];
};

export type TableColumnHeaderProps = {
  column: Column<any>;
  onSortChange: (
    sortItem: TableSortItem<ArrayElement<TableColumnHeaderProps["data"]>>
  ) => void;
  sort?: TableSortItem<ArrayElement<TableColumnHeaderProps["data"]>>[];
  columns: Column<any>[];
  index: number;
  filter?: any;
  onFilterChange: (filter: [string, any]) => void;
  openedTags?: string[];
  setOpenTag?: (key: string) => void;
  data: any[];
  selectable?: boolean;
  withRowGrouping?: boolean;
  selected: CheckBoxProps["checked"];
  onCheck: () => void;
  onResizeStart?: (
    column: Column<any>,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  width: number;
  smallHeader: boolean;
  headerRender?: (title: string) => any;
  isLastOfSticky: boolean;
  shouldExpandAllRowGroups: boolean;
  toggleRowGroupExpanding: () => void;
};

export type FooterProps = {
  render?: () => any;
};

export type RowGroupHeader = {
  groupName: string;
  displayGroupName?: string;
  isGroupHeader: boolean;
  isExpanded: boolean;
  render?: (
    rowGroupFieldName: string,
    rowGroupItem: RowGroupItem<{name: string} & Record<string, any>>
  ) => ReactNode;
  couldBeCollapsed?: boolean;
};

/**
 * Группировка строк
 */
export type RowGroupProps<T extends {name: string}> = {
  fieldName: string;
  data?: RowGroupItem<T>[];
  headerCustomRender?: (
    rowGroupFieldName: string,
    isExpanded: boolean,
    rowGroupItem?: RowGroupItem<T>
  ) => ReactNode;
  groupValueForOutsiders?: string;
  colorFieldName?: string;

  // Синхронизация группировки строк
  unionState?: Record<string, boolean>;
  onUnionStateChange?: (val: Record<string, boolean>) => void;
};

export type RowGroupData<T extends {name: string}> = RowGroupProps<T> & {
  isLast?: boolean;
  isFirst?: boolean;
};
export type RowGroupItem<T extends {name: string}> = T;
