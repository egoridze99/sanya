import {clone, find, findIndex, propEq} from "ramda";
import React, {useCallback, useMemo, useState} from "react";
import {ReactSVG} from "react-svg";

import {
  getColumnsFromStorage,
  getFilterFromStorage,
  getSortFromStorage,
  setColumnsToStorage
} from "./helpers/tableConfigStorage";

import settingsIcon from "./assets/settings.svg";
import RowGroupHeader from "./components/RowGroupHeader/RowGroupHeader";
import Row from "./components/Row/Row";
import Header from "./components/Header/Header";
import {
  Column,
  RowGroupHeader as RowGroupHeaderType,
  TableProps
} from "./types";
import {CHECKBOX_COLUMN_WIDTH, EXPAND_GROUPS_COLUMN_WIDTH} from "./constants";
import {useColumns} from "./hooks/useColumns";
import Footer from "./components/Footer/Footer";
import {Modal} from "../Modal";
import {CheckBox} from "../CheckBox";
import {Pagination} from "../Pagination";
import classnames from "classnames";
import {observer} from "mobx-react-lite";
import {useFilteredTableData} from "./hooks/useFilteredTableData";
import {useSortedData} from "./hooks/useSortedData";
import {useSynchronizeTables} from "./hooks/useSynchronizeTables";
import {useDataForRowGrouping} from "./hooks/useDataForRowGrouping";
import {useTableData} from "./hooks/useTableData";

import "./table.scss";

type ColumnWidthDictionary = {[key: string]: number};

export const Table: React.FC<TableProps> = observer(
  ({
    columns: cols = [],
    data = [],
    selectedRows = [],
    pagination = true,
    defaultColumnsVisible = [],
    selectable = false,
    uqKey = "id",
    onChangeSelectedRows,
    defaultItemsOnPage = 25,
    onItemsOnPageChange,
    sortBy,
    multiline = true,
    rowsHeight = 50,
    header = true,
    smallHeader = false,
    height,
    selectColumnsVisible = true,
    onItemChange,
    onClickRow,
    footerRender,
    selectedEditorRowRender,
    unionPage,
    onPageChange,
    sorted,
    onSortChange,
    filtered,
    onFilterChange,
    onScroll,
    scrollX = 0,
    scrollY = 0,
    innerRef,
    className,
    paginationPosition = "top",
    onVisibleColumnChange,
    tableId,
    fillRow = true,
    rowGroupProps,
    rowColorFieldName
  }) => {
    const groupValueForOutsiders =
      rowGroupProps?.groupValueForOutsiders || "Без группы";
    const [page, setPage] = React.useState(0);
    const [itemsOnPage, setItemsOnPage] = React.useState(defaultItemsOnPage);
    const [openedTags, setOpenedTags] = React.useState<string[]>([]);
    const [columnsModalVisible, setColumnsModalVisible] = React.useState(false);
    const [columnsVisible, setColumnsVisible] = React.useState<string[]>([]);
    const [
      columnWidths,
      setColumnWidths
    ] = React.useState<ColumnWidthDictionary>({});
    const [
      resizeableColumn,
      setResizeableColumn
    ] = React.useState<Column<any> | null>(null);
    const [pageX, setPageX] = React.useState<number>(0);
    const [sliderPosition, setSliderPosition] = useState<number>(0);
    const [startPosition, setStartPosition] = useState<number>(0);
    const [rowGroupsState, setRowGroupsState] = useState<
      Record<string, boolean>
    >(rowGroupProps?.unionState || {});
    const tableRef = React.useRef<HTMLDivElement | null>(null);

    const uniqueKey = React.useMemo(
      () => (typeof uqKey === "string" ? uqKey : uqKey()),
      [uqKey]
    );

    const [columns, columnsGroups] = useColumns(
      cols,
      selectable,
      columnsVisible,
      !!rowGroupProps
    );
    const {
      filters,
      setFilters,
      handleFiltersChange,
      filteredData
    } = useFilteredTableData({
      tableId,
      data,
      filtered,
      onFilterChange,
      cols,
      columns
    });

    const {
      handleSortChange,
      sortedData,
      setSort,
      sort,
      setSortedData
    } = useSortedData({
      data,
      sorted,
      columns,
      cols,
      tableId,
      filteredData,
      onSortChange
    });

    const {
      dataForRowGroupsHeaderAsDict,
      selectedGroupsData,
      expandRowGroup,
      handleRowGroupCheck,
      rowGroupDataForEveryItem,
      groupedData,
      shouldExpandAllRowGroups,
      toggleRowGroupExpanding
    } = useDataForRowGrouping({
      groupByFieldName: rowGroupProps?.fieldName,
      onChangeSelectedRows,
      setRowGroupsState,
      rowGroupItems: rowGroupProps?.data,
      groupFieldNameForOutsiders: groupValueForOutsiders,
      sortedData,
      selectedRows,
      uniqueKey,
      rowGroupsState
    });

    useSynchronizeTables({
      sort,
      setSort,
      tableRef,
      rowGroupState: rowGroupsState,
      setRowGroupState: setRowGroupsState,
      filters,
      setFilters,
      filtered,
      onFilterChange,
      onSortChange,
      sorted,
      scrollY,
      scrollX,
      onUnionRowGroupStateChange: rowGroupProps?.onUnionStateChange,
      unionRowGroupState: rowGroupProps?.unionState
    });

    const {itemsCount, pageableData} = useTableData({
      page: typeof unionPage !== "undefined" ? unionPage : page,
      groupByFieldName: rowGroupProps?.fieldName,
      hasRowGrouping: !!rowGroupProps,
      headerCustomRender: rowGroupProps?.headerCustomRender,
      groupedData,
      rowGroupsState,
      itemsOnPage,
      uniqueKey,
      dataForRowGroupsHeaderAsDict,
      rowGroupDataForEveryItem,
      groupValueForOutsiders,
      sortedData
    });

    React.useEffect(() => {
      setItemsOnPage(defaultItemsOnPage);
    }, [defaultItemsOnPage]);

    React.useEffect(() => {
      if (tableId && columnsVisible.length) {
        setColumnsToStorage(tableId, columnsVisible);
      }
    }, [columnsVisible, tableId]);

    React.useEffect(() => {
      if (onItemsOnPageChange) {
        onItemsOnPageChange(itemsOnPage);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsOnPage]);

    React.useEffect(() => {
      setPage(0);
    }, [data]);

    React.useEffect(() => {
      if (sortBy) {
        setSort(sortBy);
      }
      if (tableId) {
        const sort = getSortFromStorage(tableId);
        if (sort && sort.length) {
          setSort(sort);
        }

        const filters = getFilterFromStorage(tableId);
        if (filters && Object.keys(filters).length) {
          setFilters(filters);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      if (!onVisibleColumnChange) {
        return;
      }

      onVisibleColumnChange(columnsVisible);
    }, [columnsVisible, onVisibleColumnChange]);

    const lastStickyColumnKey = useMemo(() => {
      const lastStickyColumn = columns.find((column, index, arr) => {
        if (column.sticky && arr.length > index + 1) {
          return !arr[index + 1].sticky;
        }
        return false;
      });

      return lastStickyColumn?.key;
    }, [columns]);

    React.useEffect(() => {
      const columnWidths: ColumnWidthDictionary = cols.reduce(
        (result, column) => {
          const {width} = column;
          if (width && width.includes("px")) {
            const numberWidth = parseInt(width.replace("px", ""), 10);
            return {...result, [column.key]: numberWidth};
          }
          return result;
        },
        {}
      );
      if (selectable) {
        columnWidths["table-check"] = CHECKBOX_COLUMN_WIDTH;
      }
      if (rowGroupProps) {
        columnWidths["table-expand-groups"] = EXPAND_GROUPS_COLUMN_WIDTH;
      }
      setColumnWidths(columnWidths);
    }, [cols, selectable]);

    React.useEffect(() => {
      const stickyColumnsKeys = cols
        .filter((col) => col.sticky)
        .map((col) => col.key);

      setColumnsVisible(() => {
        if (tableId) {
          const fromStorage = getColumnsFromStorage(tableId);
          if (fromStorage && fromStorage.length) {
            return fromStorage;
          }
        }
        return [...defaultColumnsVisible, ...stickyColumnsKeys];
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cols, defaultColumnsVisible]);

    React.useEffect(() => {
      if (!!onChangeSelectedRows) {
        onChangeSelectedRows([]);
      }
    }, [page, sort, itemsOnPage, filters, onChangeSelectedRows, unionPage]);

    const handleSelectRow = React.useCallback(
      (row: any) => {
        if (!!onChangeSelectedRows) {
          const index = findIndex(propEq(uniqueKey, row[uniqueKey]))(
            selectedRows
          );
          let newSelectedRows: any[];
          if (index >= 0) {
            const prevData = [...selectedRows];
            prevData.splice(index, 1);
            //@ts-ignore
            newSelectedRows = prevData;
          } else {
            //@ts-ignore
            newSelectedRows = [...selectedRows, row];
          }
          onChangeSelectedRows(newSelectedRows);
        }
      },
      [uniqueKey, onChangeSelectedRows, selectedRows]
    );

    const paginationContent = React.useMemo(() => {
      return pagination ? (
        <Pagination
          totalCount={itemsCount}
          page={typeof unionPage !== "undefined" ? unionPage : page}
          setPage={onPageChange ? onPageChange : setPage}
          itemsOnPage={itemsOnPage}
          setItemsOnPage={setItemsOnPage}
          hasElementsCountInput={true}
        />
      ) : null;
    }, [
      itemsCount,
      itemsOnPage,
      onPageChange,
      unionPage,
      setItemsOnPage,
      page
    ]);

    const handleTagChange = useCallback(
      (key: string) =>
        setOpenedTags((prev) =>
          prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        ),
      []
    );

    const handleColumnCheck = React.useCallback(() => {
      if (!!onChangeSelectedRows) {
        if (selectedRows.length) {
          onChangeSelectedRows([]);
        } else {
          onChangeSelectedRows(
            pageableData
              .filter((item: RowGroupHeaderType) => !item.isGroupHeader)
              .map((item) => item)
          );
        }
      }
    }, [pageableData, selectedRows, onChangeSelectedRows]);

    const handleColumnResizeStart = useCallback(
      (
        column: Column<any>,
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
      ) => {
        event.persist();
        setResizeableColumn(column);
        setStartPosition(event.pageX);
        setSliderPosition(event.pageX);
        setPageX(event.pageX);
      },
      []
    );

    const handleColumnResizeEnd = React.useCallback(() => {
      if (resizeableColumn) {
        setResizeableColumn(null);
        const minWidth = 60;
        const newWidth =
          columnWidths[resizeableColumn.key] + sliderPosition - startPosition;
        if (newWidth > minWidth) {
          columnWidths[resizeableColumn.key] = newWidth;
        } else {
          columnWidths[resizeableColumn.key] = minWidth;
        }
        setColumnWidths({...columnWidths});
      }
    }, [columnWidths, resizeableColumn, sliderPosition, startPosition]);

    const NOOP = useCallback(() => false, []);
    const Slider = React.memo(({position}: {position: number}) => {
      return (
        <div
          className="Table__slider"
          onDragStart={NOOP}
          style={{left: position}}
        />
      );
    });

    const handleColumnResize = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.persist();
        if (resizeableColumn && pageX !== event.pageX) {
          const delta = pageX - event.pageX;
          setSliderPosition((prev) => prev - delta);
          setPageX(event.pageX);
        }
      },
      [resizeableColumn, pageX]
    );

    const handleItemChange = useCallback(
      (item: any) => {
        const target = sortedData.find(
          (itemInTable) => itemInTable[uniqueKey] === item[uniqueKey]
        );
        const prev = clone(target);
        Object.keys(target).forEach((key) => {
          target[key] = item[key];
        });
        setSortedData([...sortedData]);
        onItemChange && onItemChange(prev, item);
      },
      [sortedData, onItemChange]
    );

    const handleTableScroll = React.useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        onScroll &&
          onScroll(e.currentTarget.scrollTop, e.currentTarget.scrollLeft);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    const colCheckerContent = React.useMemo(() => {
      return Object.keys(columnsGroups).map((colGroupName) => {
        const isVisibleColumns = columnsGroups[colGroupName]
          .filter(({unalterable}) => !unalterable)
          .filter(({sticky}) => !sticky)
          .map(({key}) => columnsVisible.includes(key));
        const allChecked = !isVisibleColumns.includes(false);
        const allUnChecked = !isVisibleColumns.includes(true);
        const allColsInGroupAreUnalterable = columnsGroups[colGroupName].every(
          (col) => col.unalterable
        );

        if (allColsInGroupAreUnalterable) {
          return null;
        }

        return (
          <div className={"Table__group-checker-container"} key={colGroupName}>
            <div className="Table__group-checker-title">
              <div
                className={"Table__group-checker-container-checkbox-container"}
              >
                <CheckBox
                  checkBoxType="secondary"
                  label={colGroupName}
                  onChange={() => {
                    setColumnsVisible((prev) => {
                      const allKeys = columnsGroups[colGroupName]
                        .map(
                          ({key, unalterable, sticky}) =>
                            !unalterable && !sticky && key
                        )
                        .filter((v) => !!v) as string[];

                      return allUnChecked
                        ? [...prev, ...allKeys]
                        : prev.filter((key) => !allKeys.includes(key));
                    });
                  }}
                  checked={!allChecked && !allUnChecked ? "part" : allChecked}
                />
              </div>
            </div>
            <div className="Table__group-checker-cols">
              {columnsGroups[colGroupName].map((col) => {
                if (col.unalterable) {
                  return null;
                }
                const checked = columnsVisible.includes(col.key);
                return (
                  <div
                    key={col.key}
                    className={
                      "Table__group-checker-container-checkbox-container"
                    }
                  >
                    <CheckBox
                      checkBoxType="secondary"
                      key={col.key}
                      label={
                        <div className="Table__column-group-label">
                          {col.title}
                          {col.collapseTag && <span> [{col.collapseTag}]</span>}
                        </div>
                      }
                      checked={checked}
                      disabled={col.unalterable || col.sticky}
                      onChange={() =>
                        setColumnsVisible((prev) =>
                          checked
                            ? prev.filter((colKey) => colKey !== col.key)
                            : [...prev, col.key]
                        )
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      });
    }, [columnsGroups, columnsVisible]);

    const tableContent = React.useMemo(() => {
      return (
        <table className="Table">
          <tbody>
            {header && (
              <Header
                columnWidths={columnWidths}
                columns={columns}
                data={pageableData}
                filters={filters}
                handleColumnCheck={handleColumnCheck}
                handleColumnResizeStart={handleColumnResizeStart}
                handleFiltersChange={handleFiltersChange}
                handleSortChange={handleSortChange}
                handleTagChange={handleTagChange}
                lastStickyColumnKey={lastStickyColumnKey}
                openedTags={openedTags}
                sort={sort || []}
                selectable={selectable}
                selectedRows={selectedRows}
                smallHeader={smallHeader}
                fillRow={fillRow}
                shouldExpandAllRowGroups={shouldExpandAllRowGroups}
                toggleRowGroupExpanding={toggleRowGroupExpanding}
                withRowGrouping={!!rowGroupProps}
              />
            )}
            {selectedEditorRowRender && (
              <tr className="Table__Row">
                <td
                  className="Table__selected-editor-row"
                  colSpan={100}
                  style={{
                    top: smallHeader ? "49px" : "80px"
                  }}
                >
                  {selectedEditorRowRender()}
                </td>
              </tr>
            )}
            {pageableData.map((row: RowGroupHeaderType | any) => {
              const selected = !!find(propEq(uniqueKey, row[uniqueKey]))(
                selectedRows
              );
              return row.isGroupHeader ? (
                <RowGroupHeader
                  key={row.groupName}
                  groupName={row.displayGroupName || row.groupName}
                  isExpanded={row.isExpanded}
                  render={row.render}
                  rowsHeight={rowsHeight}
                  onGroupExpand={() => expandRowGroup(row.groupName)}
                  couldBeCollapsed={row.couldBeCollapsed}
                  checkboxOptions={
                    selectable && onChangeSelectedRows
                      ? {
                          checked: selectedGroupsData[row.groupName],
                          onGroupCheck: (val) =>
                            handleRowGroupCheck(val, row.groupName)
                        }
                      : undefined
                  }
                />
              ) : (
                <Row
                  key={row[uniqueKey]}
                  onClickRow={onClickRow}
                  columnWidths={columnWidths}
                  columns={columns}
                  handleItemChange={onItemChange ? handleItemChange : undefined}
                  handleSelectRow={handleSelectRow}
                  lastStickyColumnKey={lastStickyColumnKey}
                  multiline={multiline}
                  openedTags={openedTags}
                  row={row}
                  rowsHeight={rowsHeight}
                  selectable={selectable}
                  selected={selected}
                  uniqueKey={uniqueKey}
                  fillRow={fillRow}
                  rowColorFieldName={rowColorFieldName}
                  withRowGrouping={!!rowGroupProps}
                  rowBorderFieldName={
                    rowGroupProps?.colorFieldName || undefined
                  }
                  rowGroupData={rowGroupDataForEveryItem[row[uniqueKey]]}
                />
              );
            })}
          </tbody>
        </table>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      columnWidths,
      columns,
      pageableData,
      filters,
      handleColumnCheck,
      handleSortChange,
      lastStickyColumnKey,
      openedTags,
      sort,
      selectable,
      selectedRows,
      smallHeader,
      uniqueKey,
      handleItemChange,
      handleSelectRow,
      multiline,
      rowsHeight
    ]);

    return (
      <div
        className={classnames("Table-container", className)}
        style={{height: height || "100%"}}
      >
        {paginationPosition === "top" && <div>{paginationContent}</div>}
        <div
          className={classnames("Table-body", {
            "Table-body_resizeable": !!resizeableColumn
          })}
          ref={(el) => {
            tableRef.current = el;
            if (innerRef) {
              innerRef.current = el;
            }
          }}
          onScroll={handleTableScroll}
          onMouseMove={handleColumnResize}
          onMouseUp={handleColumnResizeEnd}
        >
          {selectColumnsVisible && (
            <div
              className="Table-columns-checker"
              onClick={() => setColumnsModalVisible(true)}
            >
              <ReactSVG src={settingsIcon} />
              <span>Колонки</span>
            </div>
          )}
          <div style={{flex: 1, width: "100%"}}>{tableContent}</div>
          {resizeableColumn && <Slider position={sliderPosition} />}
          <Footer render={footerRender} />
        </div>
        <Modal
          visible={columnsModalVisible}
          onActionClick={() => setColumnsModalVisible(false)}
          title="Колонки"
        >
          <div className="Table-groups-modal-content">{colCheckerContent}</div>
        </Modal>
        {paginationPosition === "bottom" && <div>{paginationContent}</div>}
      </div>
    );
  }
);
