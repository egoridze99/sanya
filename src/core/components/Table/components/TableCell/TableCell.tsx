import React, {useCallback, useMemo} from "react";
import {Column} from "../../types";
import {
  CHECKBOX_COLUMN_WIDTH,
  EXPAND_GROUPS_COLUMN_WIDTH
} from "../../constants";
import {CheckBox} from "../../../CheckBox";
import classnames from "classnames";

import "./tableCell.scss";
import {observer} from "mobx-react-lite";

const TableCell: React.FC<{
  row: any;
  column: Column<any>;
  selectable?: boolean;
  onRowSelect: (row: any) => void;
  selected: boolean;
  width: number;
  multiline: boolean;
  onItemChange?: (item: any) => void;
  cellHeight: number;
  rowBackground?: string;
  withRowGrouping: boolean;
  borderContent?: React.ReactNode;
  borderBottomColor?: string;
  shouldRoundCorners;
}> = ({
  row,
  column,
  selectable = false,
  selected = false,
  onRowSelect,
  width,
  multiline,
  onItemChange,
  cellHeight,
  rowBackground,
  withRowGrouping,
  borderContent,
  borderBottomColor,
  shouldRoundCorners
}) => {
  const content = useMemo(() => {
    return column?.render ? (
      column.render(column.dataKey, row, onItemChange)
    ) : (
      <div
        className={classnames("Table__Cell-content", [
          multiline && "Table__Cell-content_multiline"
        ])}
      >
        {row[column.dataKey]}
      </div>
    );
  }, [column, multiline, onItemChange, row]);

  const isCheckColumn = useMemo(
    () => column.key === "table-check",
    [column.key]
  );

  const isRowGroupingColumn = useMemo(
    () => column.key === "table-expand-groups",
    [column.key]
  );

  const onSelectItem = useCallback(() => {
    onRowSelect(row);
  }, [row, onRowSelect]);

  if (column.sticky) {
    let shift;

    if (isCheckColumn) {
      shift = 0;
    } else if (isRowGroupingColumn) {
      shift = selectable ? CHECKBOX_COLUMN_WIDTH : 0;
    } else {
      const checkboxColumnWidth = selectable ? CHECKBOX_COLUMN_WIDTH : 0;
      const expandColumnWidth = withRowGrouping
        ? EXPAND_GROUPS_COLUMN_WIDTH
        : 0;

      shift = (column.shift || 0) + checkboxColumnWidth + expandColumnWidth;
    }

    return (
      <th
        className={classnames([
          "Table__Cell-cell",
          shouldRoundCorners && "Table__Cell-cell_round-corners",
          "Table__Cell-cell_sticky",
          (isCheckColumn ||
            isRowGroupingColumn ||
            column.hasRightBorder === false) &&
            "Table__Cell-cell_without-border",
          "Table__Cell",
          selected ? "active" : ""
        ])}
        title={column.render ? "" : row[column.dataKey]}
        style={{
          left: shift,
          width: width,
          textAlign: column.textAlign,
          height: cellHeight,
          borderBottomColor: borderBottomColor || "#DFDEE2",
          backgroundColor: rowBackground
        }}
      >
        {borderContent}
        {(!selectable || !isCheckColumn) && (
          <>
            <div className="Table__Cell-base">{content}</div>
          </>
        )}
        {!!selectable && isCheckColumn && (
          <div className="Table__Cell-checkbox">
            <CheckBox onChange={onSelectItem} checked={selected} />
          </div>
        )}
      </th>
    );
  }

  return (
    <>
      {column.render ? (
        <td
          className={classnames([
            "Table__Cell-cell",
            shouldRoundCorners && "Table__Cell-cell_round-corners",
            column.hasRightBorder === false &&
              "Table__Cell-cell_without-border",
            "Table__Cell",
            "Table__Cell-td",
            selected ? "active" : ""
          ])}
          style={{
            height: cellHeight + "px",
            width: width + "px" || "auto",
            textAlign: column.textAlign || "left",
            borderBottomColor: borderBottomColor || "#DFDEE2",
            backgroundColor: rowBackground
          }}
          title=""
        >
          {borderContent}
          {content}
        </td>
      ) : (
        <td
          className={classnames([
            "Table__Cell-cell",
            shouldRoundCorners && "Table__Cell-cell_round-corners",
            column.hasRightBorder === false &&
              "Table__Cell-cell_without-border",
            "Table__Cell",
            selected ? "active" : "",
            "Table__Cell-body"
          ])}
          title={row[column.dataKey]}
          style={{
            height: cellHeight + "px",
            width: width + "px" || "auto",
            textAlign: column.textAlign || "left",
            borderBottomColor: borderBottomColor || "#DFDEE2",
            backgroundColor: rowBackground
          }}
        >
          {borderContent}
          {content}
        </td>
      )}
    </>
  );
};
export default observer(TableCell);
