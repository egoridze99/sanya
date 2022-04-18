import React from "react";
import {Column, TableSortItem} from "../types";
import {ArrayElement} from "src/core/core.types";
import {setSortToStorage} from "../helpers/tableConfigStorage";
import {find, indexOf, propEq} from "ramda";

type UseSortedDataArgs = {
  tableId?: string;
  data: any[];
  sorted?: any[];
  filteredData: any[];
  columns: Column<any>[];
  cols: Column<any>[];
  onSortChange?: (items: any[]) => void;
};

/**
 * Управляет сортировками и сортировкой данных в таблице
 * @param data Табличные данные
 * @param sorted Сихронизированные сортировки между таблицами
 * @param tableId id таблицы в LS
 * @param filteredData Фильтрованые данные
 * @param columns Колонки преобразованные таблицей
 * @param cols Колонки приходящие извне
 * @param onSortChange Колбэк для синхронизации сортировок между таблицами
 */
export const useSortedData = ({
  data,
  sorted,
  tableId,
  filteredData,
  columns,
  cols,
  onSortChange
}: UseSortedDataArgs) => {
  const [sort, setSort] = React.useState<
    TableSortItem<ArrayElement<typeof data>>[] | null
  >(sorted || null);
  const [sortedData, setSortedData] = React.useState<any[]>([]);

  const handleSortChange = React.useCallback(
    ([key, direction]: TableSortItem<ArrayElement<typeof data>>) => {
      const ascIndex = indexOf([key, "asc"], sort || []);
      const descIndex = indexOf([key, "desc"], sort || []);
      if (ascIndex < 0 && descIndex < 0) {
        setSort(() => [[key, direction]]);
      } else if (
        (ascIndex >= 0 && direction === "desc") ||
        (descIndex >= 0 && direction === "asc")
      ) {
        setSort((prev) =>
          (prev || []).map((item) =>
            item[0] === key ? [key, direction] : item
          )
        );
      } else {
        setSort((prev) => (prev || []).filter((item) => item[0] !== key));
      }
    },
    [sort]
  );

  React.useEffect(() => {
    if (tableId && sort) {
      setSortToStorage(tableId, sort);
    }
  }, [sort, tableId]);

  React.useEffect(() => {
    setTimeout(() => {
      const sorted = [...filteredData];
      const sortReverse = [...(sort || [])].reverse();
      for (let [key, direction] of sortReverse) {
        sorted.sort((a, b) => {
          let column = find(propEq("key", key))(columns) as Column<any>;
          if (sorted && onSortChange && !column) {
            column = find(propEq("key", key))(cols) as Column<any>;
          }
          if (!column) return 0;
          const aContent = !!column.sortFunction
            ? column.sortFunction(a[key], a)
            : a[key];
          const bContent = !!column.sortFunction
            ? column.sortFunction(b[key], b)
            : b[key];
          if (aContent > bContent) {
            return direction === "asc" ? 1 : -1;
          }
          if (aContent < bContent) {
            return direction === "asc" ? -1 : 1;
          }
          return 0;
        });
      }
      setSortedData(sorted);
    }, 200);
  }, [filteredData, sort, columns]);

  return {sortedData, handleSortChange, setSort, sort, setSortedData};
};
