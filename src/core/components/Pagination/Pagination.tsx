import React, {useEffect} from "react";
import classnames from "classnames";
import usePagination from "./hooks/usePagination";

import {ReactComponent as LeftFullIcon} from "./assets/arrow-left-full.svg";
import {ReactComponent as LeftIcon} from "./assets/arrow-left.svg";
import {ReactComponent as RightFullIcon} from "./assets/arrow-right-full.svg";
import {ReactComponent as RightIcon} from "./assets/arrow-right.svg";
import {Dropdown} from "../Dropdown";

import "./pagination.scss";

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalCount: number;
  itemsOnPage?: number;
  siblingsCount?: number;
  setItemsOnPage?: (c: number) => void;
  hasElementsCountInput?: boolean;
  className?: string;
};

const itemsOnPageData = [
  {label: 10, value: 10},
  {label: 25, value: 25},
  {label: 50, value: 50},
  {label: 75, value: 75},
  {label: 100, value: 100},
  {label: 150, value: 150},
  {label: 200, value: 200}
];

export const Pagination: React.FC<PaginationProps> = React.memo(
  ({
    page,
    setPage,
    totalCount = 0,
    itemsOnPage = 10,
    setItemsOnPage,
    hasElementsCountInput = false,
    siblingsCount = 2,
    className = ""
  }) => {
    const {pagesCount, paginationRange, shownItemsRange} = usePagination({
      page,
      siblingsCount,
      totalCount,
      itemsOnPage
    });

    useEffect(() => {
      if (page > pagesCount - 1) {
        setPage(0);
      }
    }, [pagesCount]);

    const handleNextPage = React.useCallback(
      () =>
        setPage(
          page < Math.ceil(totalCount / itemsOnPage) - 1 ? page + 1 : page
        ),
      [page, totalCount, itemsOnPage, setPage]
    );

    const handlePrevPage = React.useCallback(
      () => setPage(page > 0 ? page - 1 : page),
      [page, setPage]
    );

    const handleChangePage = React.useCallback((p: number) => setPage(p - 1), [
      setPage
    ]);

    const goToFirstPage = React.useCallback(() => {
      setPage(0);
    }, [setPage]);

    const goToLastPage = React.useCallback(() => {
      setPage(pagesCount - 1);
    }, [setPage, pagesCount]);

    return (
      <div className={classnames("Pagination", className)}>
        <div className="Pagination__arrows Pagination__arrows_left">
          <div
            className={classnames([
              "Pagination__arrows-item",
              page === 0 && "Pagination__arrows-item_disabled"
            ])}
            onClick={goToFirstPage}
          >
            <LeftFullIcon />
          </div>
          <div
            className={classnames([
              "Pagination__arrows-item",
              page === 0 && "Pagination__arrows-item_disabled"
            ])}
            onClick={handlePrevPage}
          >
            <LeftIcon />
          </div>
        </div>
        {paginationRange.map((p, index) => (
          <div
            className={classnames([
              "Pagination__item",
              +p === page + 1 && "Pagination__item_active",
              p === "..." && "Pagination__item_dots"
            ])}
            key={`page--${p}-${index}`}
            onClick={p !== "..." ? () => handleChangePage(+p) : undefined}
          >
            {p}
          </div>
        ))}
        <div className="Pagination__arrows Pagination__arrows_right">
          <div
            className={classnames([
              "Pagination__arrows-item",
              page === pagesCount - 1 && "Pagination__arrows-item_disabled"
            ])}
            onClick={handleNextPage}
          >
            <RightIcon />
          </div>
          <div
            className={classnames([
              "Pagination__arrows-item",
              page === pagesCount - 1 && "Pagination__arrows-item_disabled"
            ])}
            onClick={goToLastPage}
          >
            <RightFullIcon />
          </div>
        </div>
        <p className="Pagination__range-text">{shownItemsRange}</p>
        {hasElementsCountInput && (
          <div className="Pagination__dropdown">
            <Dropdown
              onChange={(val) => setItemsOnPage && setItemsOnPage(val)}
              value={itemsOnPage}
              items={itemsOnPageData}
              labelProperty={"label"}
              keyProperty={"value"}
              visibleRowsCount={5}
              positions={["top", "bottom", "left", "right"]}
            />
          </div>
        )}
      </div>
    );
  }
);
