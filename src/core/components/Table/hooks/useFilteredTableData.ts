import React, {useCallback} from "react";
import {setFilterToStorage} from "../helpers/tableConfigStorage";
import {Column, FilterFunctionType} from "../types";
import {find, propEq} from "ramda";
import {
  multiselectFilterFunction,
  rangeFilterFunction,
  textFilterFunction
} from "../components/Filters";

type UseFilteredTableDataArgs = {
  tableId?: string;
  data: any;
  columns: Column<any>[];
  onFilterChange?: (item: {[x: string]: {value: any; options: any}}) => void;
  filtered?: {
    [x: string]: {value: any; options: any};
  };
  cols: Column<any>[];
};

/**
 * Управляет фильтрами и фильтрацией данных в таблице
 * @param tableId id таблицы в LS
 * @param data Табличные данные
 * @param columns Колонки преобразованные в таблице
 * @param onFilterChange Колбэк для синхронизации фильтров в нескольких таблицах
 * @param filtered Синхронизированные между таблицами фильтры
 * @param cols Колонки приходящие извне
 */
export const useFilteredTableData = ({
  tableId,
  data,
  columns,
  onFilterChange,
  filtered,
  cols
}: UseFilteredTableDataArgs) => {
  const [filters, setFilters] = React.useState<{
    [x: string]: {value: any; options: any};
  }>({});
  const [filteredData, setFilteredData] = React.useState<any[]>([]);

  const handleFiltersChange = useCallback(
    ([key, filter]: [string, any]) =>
      setFilters((prev) => ({...prev, [key]: filter})),
    []
  );

  React.useEffect(() => {
    if (tableId && Object.keys(filters).length) {
      setFilterToStorage(tableId, filters);
    }
  }, [filters, tableId]);

  React.useEffect(() => {
    setTimeout(() => {
      const filteredData = [...data].filter((row) => {
        for (let filterKey in filters) {
          let columnByFilterKey: Column<any> | undefined = find(
            propEq("key", filterKey)
          )(columns) as Column<any>;
          if (filtered && onFilterChange && !columnByFilterKey) {
            columnByFilterKey = find(propEq("key", filterKey))(
              cols
            ) as Column<any>;
          }
          if (columnByFilterKey) {
            let filterFunction: any = null;
            switch (columnByFilterKey.filterFunctionType) {
              case FilterFunctionType.TEXT:
                filterFunction = textFilterFunction;
                break;
              case FilterFunctionType.RANGE:
                filterFunction = rangeFilterFunction;
                break;
              case FilterFunctionType.MULTISELECT:
                filterFunction = multiselectFilterFunction;
                break;
              case FilterFunctionType.CUSTOM:
                filterFunction = columnByFilterKey.customFilterFunction;
            }
            if (
              !!filterFunction &&
              !filterFunction(row[filterKey], filters[filterKey])
            ) {
              return false;
            }
          }
        }
        return true;
      });
      setFilteredData(filteredData);
    }, 200);
  }, [data, filters, columns]);

  return {
    filters,
    setFilters,
    handleFiltersChange,
    filteredData
  };
};
