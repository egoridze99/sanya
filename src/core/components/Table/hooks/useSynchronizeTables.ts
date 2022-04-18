import React from "react";
import {equals} from "ramda";
import {TableSortItem} from "../types";

type UseSynchronizeTablesArgs = {
  scrollX?: number;
  scrollY?: number;
  tableRef: React.MutableRefObject<HTMLDivElement | null>;

  filtered?: {
    [x: string]: {value: any; options: any};
  };
  onFilterChange?: (item: {[x: string]: {value: any; options: any}}) => void;
  filters: {[p: string]: {value: any; options: any}};
  setFilters: (val: any) => void;

  sorted?: any[];
  onSortChange?: (items: any[]) => void;
  sort: TableSortItem<any>[] | null;
  setSort: (val: any) => void;

  unionRowGroupState?: Record<string, boolean>;
  onUnionRowGroupStateChange?: (val: Record<string, boolean>) => void;
  rowGroupState: Record<string, boolean>;
  setRowGroupState: (val: Record<string, boolean>) => void;
};

export const useSynchronizeTables = ({
  scrollX,
  scrollY,
  tableRef,
  onFilterChange,
  onSortChange,
  onUnionRowGroupStateChange,
  sorted,
  unionRowGroupState,
  filtered,
  setFilters,
  filters,
  setSort,
  sort,
  rowGroupState,
  setRowGroupState
}: UseSynchronizeTablesArgs) => {
  // Синхронизация скролов
  React.useEffect(() => {
    if (tableRef.current && scrollX !== undefined) {
      setTimeout(() => {
        tableRef.current?.scroll({left: scrollX});
      }, 500);
    }
  }, [scrollX]);

  React.useEffect(() => {
    if (tableRef.current && scrollY !== undefined) {
      setTimeout(() => {
        tableRef.current?.scroll({top: scrollY, behavior: "smooth"});
      }, 500);
    }
  }, [scrollY]);

  // синхронизация фильтров
  React.useEffect(() => {
    if (!filtered) return;

    if (!equals(filtered, filters)) {
      setFilters(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered]);

  React.useEffect(() => {
    onFilterChange && onFilterChange(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Синхронизация сортировок
  React.useEffect(() => {
    if (!sorted) return;

    if (!equals(sorted, sort)) {
      setSort(sorted);
    }
  }, [sorted]);

  React.useEffect(() => {
    onSortChange && onSortChange(sort || []);
  }, [sort]);

  // Синхронизация группировок
  React.useEffect(() => {
    if (!unionRowGroupState) {
      return;
    }

    if (!equals(unionRowGroupState, rowGroupState)) {
      setRowGroupState(unionRowGroupState);
    }
  }, [unionRowGroupState]);

  React.useEffect(() => {
    onUnionRowGroupStateChange &&
      onUnionRowGroupStateChange(rowGroupState || {});
  }, [rowGroupState]);
};
