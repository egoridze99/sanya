import {indexOf} from "ramda";
import React, {ReactText} from "react";
import {ReactSVG} from "react-svg";
import {Popover} from "react-tiny-popover";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MultiSelectItem} from "../../../MultiSelect";
import filterIcon from "../../assets/filter.svg";
import settingsIcon from "../../assets/settings.svg";
import {MultiselectFilter, RangeFilter, TextFilter} from "../Filters";
import {FilterFunctionType, TableColumnHeaderProps} from "../../types";
import {ReactComponent as ArrowIcon} from "../../assets/arrow.svg";

import {
  CHECKBOX_COLUMN_WIDTH,
  EXPAND_GROUPS_COLUMN_WIDTH
} from "../../constants";
import {
  faPlusSquare,
  faMinusSquare,
  faSort,
  faSortAmountDown,
  faSortAmountUp
} from "@fortawesome/free-solid-svg-icons";

import "./tableColumnHeaderCell.scss";

import useOutsideClick from "src/utils/hooks/useOutsideClick";
import {CheckBox} from "../../../CheckBox";
import classnames from "classnames";

const NOOP = () => false;
export const TableColumnHeaderCell: React.FC<TableColumnHeaderProps> = ({
  column,
  onSortChange,
  sort = [],
  columns,
  index,
  onFilterChange,
  filter,
  openedTags = [],
  setOpenTag,
  data = [],
  selectable = false,

  selected,
  onCheck,
  onResizeStart = () => {},
  width,
  smallHeader = false,
  headerRender,
  withRowGrouping,
  shouldExpandAllRowGroups,
  toggleRowGroupExpanding
}) => {
  const [filterActive, setFilterActive] = React.useState(false);
  const [showAllOptions, setShowAllOptions] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const {
    title = "",
    sticky,
    shift = 0,
    key,
    hideOptions = false,
    sortable = true,
    filterData: columnFilterData
  } = column;
  const isAscSortActive = indexOf([key, "asc"], sort) >= 0;
  const isDescSortActive = indexOf([key, "desc"], sort) >= 0;
  const wrapperRef = React.useRef(null);
  const wrapperSettingsRef = React.useRef(null);
  useOutsideClick(wrapperRef, () => setFilterActive(false));
  useOutsideClick(wrapperSettingsRef, () => setShowAllOptions(false));

  const isPrelastColumnAndLastColumnWidthLessThanFilterContainer =
    columns.length - 2 === index &&
    parseInt(columns[columns.length - 1]?.width as string) < 200;
  const isLast =
    columns.length - 1 === index ||
    isPrelastColumnAndLastColumnWidthLessThanFilterContainer;

  const isTagOpened =
    !!column.collapseTag && openedTags.includes(column.collapseTag);

  const isCheckColumn = key === "table-check";
  const isExpandGroupsColumn = key === "table-expand-groups";

  const filterData = React.useMemo(() => {
    if (column.filterFunctionType === FilterFunctionType.RANGE) {
      const filterValues = data
        .filter((item) => ["number", "string"].includes(typeof item[key]))
        .map((item) => (typeof item[key] === "string" ? +item[key] : item[key]))
        .sort((a, b) => b - a);

      return [filterValues[filterValues.length - 1], filterValues[0]];
    }
    if (!!columnFilterData) {
      return columnFilterData();
    }
    return [];
  }, [column.filterFunctionType, columnFilterData, data, key]);

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onResizeStart(column, event);
  };

  const isFilterActive = React.useMemo(() => {
    if (typeof filter?.value === "undefined") return false;
    if (filter?.value instanceof Array && filter?.value.length === 0)
      return false;

    return !!filter?.value;
  }, [filter]);

  const popup = (
    <div className="Table__TableColumnHeaderCell-popup">
      <div
        className={classnames(
          "Table__TableColumnHeaderCell-popup-option",
          isDescSortActive && "Table__TableColumnHeaderCell-popup-option_active"
        )}
        onClick={() => {
          setIsOpen(false);
          onSortChange([key, "desc"]);
        }}
      >
        <FontAwesomeIcon icon={faSortAmountDown} />
        <p>По убыванию</p>
      </div>
      <div
        className={classnames(
          "Table__TableColumnHeaderCell-popup-option",
          isAscSortActive && "Table__TableColumnHeaderCell-popup-option_active"
        )}
        onClick={() => {
          setIsOpen(false);
          onSortChange([key, "asc"]);
        }}
      >
        <FontAwesomeIcon icon={faSortAmountUp} />
        <p>По возрастанию</p>
      </div>
    </div>
  );

  const currentIcon = (function () {
    switch (true) {
      case isAscSortActive:
        return <FontAwesomeIcon icon={faSortAmountUp} className="svg-active" />;
      case isDescSortActive:
        return (
          <FontAwesomeIcon icon={faSortAmountDown} className="svg-active" />
        );
      default:
        return <FontAwesomeIcon icon={faSort} />;
    }
  })();

  const popover = (
    <Popover
      isOpen={isOpen}
      content={popup}
      align="start"
      positions={["bottom"]}
      onClickOutside={() => setIsOpen(false)}
      containerStyle={{zIndex: "10000"}}
    >
      <div className={"Table__TableColumnHeaderCell-option-group"}>
        {sortable && (
          <div
            className={"Table__TableColumnHeaderCell-option-group-option"}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
          >
            {currentIcon}
          </div>
        )}
      </div>
    </Popover>
  );

  const headerActions = (
    <>
      <div
        className={classnames(
          "Table__TableColumnHeaderCell-options-container",
          smallHeader &&
            "Table__TableColumnHeaderCell-options-container_small-header"
        )}
        ref={wrapperSettingsRef}
      >
        {(showAllOptions || !hideOptions) && (
          <>
            {popover}
            {!!column.filterFunctionType && (
              <div
                className={"Table__TableColumnHeaderCell-option-group-option"}
                onClick={() => setFilterActive((prev) => !prev)}
              >
                <ReactSVG
                  src={filterIcon}
                  className={(isFilterActive && "svg-active") || undefined}
                />
              </div>
            )}
          </>
        )}
        {!showAllOptions &&
          hideOptions &&
          (sortable || !!column.filterFunctionType) && (
            <div
              className={classnames(
                "Table__TableColumnHeaderCell-option-group-option",
                (!!filter?.value || isAscSortActive || isDescSortActive) &&
                  "Table__TableColumnHeaderCell-option-group-option_active"
              )}
              onClick={() => setShowAllOptions(true)}
            >
              <ReactSVG src={settingsIcon} />
            </div>
          )}
      </div>
      {filterActive && (
        <div
          className={classnames(
            "Table__TableColumnHeaderCell-filter-container",
            isLast && "Table__TableColumnHeaderCell-filter-container_last"
          )}
          ref={wrapperRef}
        >
          {(column.filterFunctionType === FilterFunctionType.TEXT ||
            column.filterFunctionType === FilterFunctionType.CUSTOM) && (
            <TextFilter
              filterTitle={title}
              filter={filter}
              onFilterChange={(filt: {value?: string; options?: string}) =>
                onFilterChange([key, filt])
              }
            />
          )}
          {column.filterFunctionType === FilterFunctionType.RANGE && (
            <RangeFilter
              filterTitle={title}
              filter={filter}
              filterData={filterData as [number, number]}
              onFilterChange={(filt: {value?: [number?, number?]}) =>
                onFilterChange([key, filt])
              }
            />
          )}
          {column.filterFunctionType === FilterFunctionType.MULTISELECT && (
            <MultiselectFilter
              filterTitle={title}
              filter={filter}
              filterData={filterData as MultiSelectItem[]}
              onFilterChange={(filt: {value?: ReactText[]}) =>
                onFilterChange([key, filt])
              }
            />
          )}
        </div>
      )}
    </>
  );

  const zIndex = React.useMemo(() => {
    if (typeof shift !== "undefined" && sticky) return 100;
    if (column.mainTagColumn) return 12;
  }, [shift, sticky, column]);

  const leftPosition = React.useMemo(() => {
    if (typeof shift === "undefined" || !sticky) {
      return;
    }

    if (isCheckColumn) {
      return 0;
    }

    if (isExpandGroupsColumn) {
      return selectable ? CHECKBOX_COLUMN_WIDTH : 0;
    }

    const checkboxColumnWidth = selectable ? CHECKBOX_COLUMN_WIDTH : 0;
    const expandColumnWidth = withRowGrouping ? EXPAND_GROUPS_COLUMN_WIDTH : 0;

    return shift + checkboxColumnWidth + expandColumnWidth;
  }, [
    shift,
    sticky,
    isCheckColumn,
    isExpandGroupsColumn,
    selectable,
    withRowGrouping
  ]);

  return (
    <th
      className={classnames(
        "Table__TableColumnHeaderCell-customized-header-cell"
      )}
      style={{
        borderTop: isTagOpened ? "2px solid #4b92c2" : "1px #eee solid",
        height: smallHeader ? "50px" : "82px",
        background: column.headerColor || "#F6F9FF",
        width,
        zIndex: zIndex || 15,
        left: leftPosition,
        borderRight: !(
          isCheckColumn ||
          isExpandGroupsColumn ||
          column.hasRightBorder === false
        )
          ? "1px solid #dfdee2"
          : "initial",
        borderBottom: !openedTags ? "none" : ""
      }}
    >
      <div className="Table__TableColumnHeaderCell-base-header-cell">
        {!isCheckColumn && !isExpandGroupsColumn && !headerRender && (
          <h4 className="Table__TableColumnHeaderCell-label">{title}</h4>
        )}
        {headerRender && headerRender(title)}

        {isCheckColumn && (
          <CheckBox
            className="Table__TableColumnHeaderCell-header-cell-checkbox"
            onChange={onCheck}
            checked={selected}
          />
        )}

        {isExpandGroupsColumn && (
          <div className="Table__TableColumnHeaderCell-arrow-icon-container">
            <ArrowIcon
              onClick={toggleRowGroupExpanding}
              className={classnames("Table__TableColumnHeaderCell-arrow-icon", {
                "Table__TableColumnHeaderCell-arrow-icon_expanded": !shouldExpandAllRowGroups
              })}
            />
          </div>
        )}

        {!!setOpenTag && column.mainTagColumn && (
          <div
            onDragStart={NOOP}
            className={classnames([
              "Table__TableColumnHeaderCell-toggle-tag",
              isTagOpened &&
                "Table__TableColumnHeaderCell-header-cell-option-active",
              smallHeader &&
                "Table__TableColumnHeaderCell-toggle-tag_small-header"
            ])}
            onClick={() =>
              column.collapseTag ? setOpenTag(column.collapseTag) : undefined
            }
          >
            {isTagOpened ? (
              <FontAwesomeIcon size="lg" icon={faMinusSquare} />
            ) : (
              <FontAwesomeIcon size="lg" icon={faPlusSquare} />
            )}
          </div>
        )}
        {headerActions}
        {column.resizeable && (
          <div
            className={"Table__TableColumnHeaderCell-splitter"}
            onMouseDown={onMouseDown}
          />
        )}
      </div>
    </th>
  );
};

export default TableColumnHeaderCell;
