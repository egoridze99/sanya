import React from "react";
import {Column} from "../types";
import {checkColumn, expandGroupsColumn} from "../constants";

export const useColumns = (
  cols: any,
  selectable: boolean,
  columnsVisible: string[],
  hasRowsBeenGrouped: boolean
) => {
  return React.useMemo(() => {
    const colGroups: {[groupName: string]: Column<any>[]} = {};
    const filteredColumns = cols.filter((col) => {
      const group = col.group || "Основные";
      if (!!colGroups[group]) {
        colGroups[group].push(col);
      } else {
        colGroups[group] = [col];
      }
      return columnsVisible.includes(col.key);
    });

    if (hasRowsBeenGrouped) {
      filteredColumns.unshift(expandGroupsColumn);
    }

    if (selectable) {
      filteredColumns.unshift(checkColumn);
    }
    return [filteredColumns, colGroups];
  }, [cols, columnsVisible, selectable]);
};
