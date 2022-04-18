import React, {useCallback} from "react";

import TableCell from "../TableCell";
import {Column, RowGroupData} from "../../types";
import classnames from "classnames";
import {observer} from "mobx-react-lite";

type RowProps<T = any> = {
  row: RowGroupData<any> & Record<string, any>;
  columns: Column<T>[];
  openedTags: T[];
  columnWidths: {[key: string]: number};
  selectable: boolean;
  handleSelectRow: (row: any) => void;
  selected: boolean;
  multiline: boolean;
  handleItemChange?: (item: any) => void;
  lastStickyColumnKey: string | undefined;
  rowsHeight: number;
  uniqueKey: string;
  onClickRow?: (item: T) => void;
  fillRow: boolean;
  rowColorFieldName?: string;
  withRowGrouping: boolean;
  rowBorderFieldName?: string;
  rowGroupData?: RowGroupData<any>;
};

const Row: React.FC<RowProps> = ({
  row,
  columns,
  openedTags,
  columnWidths,
  selectable,
  handleSelectRow,
  selected,
  multiline,
  handleItemChange,
  rowsHeight,
  uniqueKey,
  onClickRow,
  fillRow,
  rowColorFieldName = "",
  withRowGrouping,
  rowBorderFieldName,
  rowGroupData
}) => {
  const rowBackground = React.useMemo(() => {
    return row[rowColorFieldName] || "#fff";
  }, [row[rowColorFieldName]]);

  const borderColor = React.useMemo(() => {
    return rowBorderFieldName ? rowGroupData?.[rowBorderFieldName] : undefined;
  }, [rowGroupData]);

  const borderContent = React.useMemo(() => {
    if (!rowGroupData || !borderColor) {
      return null;
    }

    return (
      <div
        className={classnames("Table__Row-border-item", {
          "Table__Row-border-item_first": rowGroupData.isFirst,
          "Table__Row-border-item_last": rowGroupData.isLast,
          "Table__Row-border-item_first_last":
            rowGroupData.isLast && rowGroupData.isFirst
        })}
        style={{background: borderColor}}
      />
    );
  }, [rowGroupData, borderColor]);

  const onClick = useCallback(() => {
    onClickRow && onClickRow(row);
  }, [onClickRow, row]);

  return (
    <tr className="Table__Row" onClick={onClick} key={row[uniqueKey]}>
      {columns.map((column, index) =>
        !column.collapseTag ||
        column.mainTagColumn ||
        (column.collapseTag && openedTags.includes(column.collapseTag)) ? (
          <TableCell
            width={columnWidths[column.key]}
            key={column.key}
            selectable={selectable}
            column={column}
            row={row}
            onRowSelect={handleSelectRow}
            selected={selected}
            multiline={multiline}
            onItemChange={handleItemChange}
            cellHeight={rowsHeight}
            withRowGrouping={withRowGrouping}
            rowBackground={rowBackground}
            shouldRoundCorners={!!borderContent && index === 0}
            borderContent={index === 0 ? borderContent : null}
            borderBottomColor={rowGroupData?.isLast && borderColor}
          />
        ) : null
      )}
      {fillRow && (
        <td
          style={{
            width: "100%",
            boxShadow: "none",
            borderBottom: 0
          }}
        />
      )}
    </tr>
  );
};

export default observer(Row);
