import React from "react";

import TableColumnHeaderCell from "../TableColumnHeaderCell";

import {Column, RowGroupHeader} from "../../types";

type HeaderProps<T = any> = {
  columns: Column<T>[];
  data: T[];
  selectedRows: T[];
  openedTags: T[];
  lastStickyColumnKey: any;
  smallHeader: boolean;
  handleSortChange: ([key, direction]: any) => void;
  filters: {[x: string]: {value: any; options: any}};
  handleFiltersChange: ([key, filter]: [string, any]) => void;
  handleTagChange: (key: string) => void;
  handleColumnResizeStart: (
    column: Column<any>,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  columnWidths: {[key: string]: number};
  handleColumnCheck: () => void;
  sort: any[];
  selectable: boolean;
  fillRow: boolean;
  shouldExpandAllRowGroups: boolean;
  toggleRowGroupExpanding: () => void;
  withRowGrouping: boolean;
};

const Header: React.FC<HeaderProps> = ({
  columns = [],
  data = [],
  selectedRows = [],
  openedTags = [],
  lastStickyColumnKey,
  smallHeader = false,
  handleSortChange,
  handleFiltersChange,
  handleColumnResizeStart,
  handleTagChange,
  filters,
  columnWidths,
  handleColumnCheck,
  sort,
  selectable,
  fillRow,
  shouldExpandAllRowGroups,
  toggleRowGroupExpanding,
  withRowGrouping
}) => {
  return (
    <tr className="Table__Row">
      {columns.map((column, index) => {
        let selected: boolean | "part" = false;
        if (selectedRows.length > 0) {
          if (
            selectedRows.length ===
            data.filter((item: RowGroupHeader) => !item.isGroupHeader).length
          ) {
            selected = true;
          } else {
            selected = "part";
          }
        }
        return !column.collapseTag ||
          column.mainTagColumn ||
          (column.collapseTag && openedTags.includes(column.collapseTag)) ? (
          <TableColumnHeaderCell
            isLastOfSticky={column.key === lastStickyColumnKey}
            smallHeader={smallHeader}
            key={column.key}
            onSortChange={handleSortChange}
            onFilterChange={handleFiltersChange}
            filter={filters[column.key]}
            sort={sort}
            column={column}
            width={columnWidths[column.key]}
            columns={columns}
            index={index}
            openedTags={openedTags}
            setOpenTag={handleTagChange}
            data={data}
            selectable={selectable}
            selected={selected}
            onCheck={handleColumnCheck}
            onResizeStart={handleColumnResizeStart}
            headerRender={column.headerRender}
            withRowGrouping={withRowGrouping}
            shouldExpandAllRowGroups={shouldExpandAllRowGroups}
            toggleRowGroupExpanding={toggleRowGroupExpanding}
          />
        ) : null;
      })}
      {fillRow && (
        <th
          style={{
            width: "100%",
            boxShadow: "none"
          }}
        />
      )}
    </tr>
  );
};

export default Header;
