import {useMemo} from "react";

type usePaginationArgs = {
  totalCount: number;
  page: number;
  siblingsCount: number;
  itemsOnPage: number;
};

const DOTS = "...";

const range = (start, end): number[] => {
  let length = end - start + 1;

  return Array.from({length}, (_, index) => index + start);
};

const usePagination = ({
  page,
  itemsOnPage,
  totalCount,
  siblingsCount
}: usePaginationArgs) => {
  const paginationData: {
    pagesCount: number;
    paginationRange: (number | string)[];
    shownItemsRange: string;
  } = useMemo(() => {
    // Страницы индексируются с нуля, а для пользователя с единицы
    page += 1;

    // Текст который показывает с какое по какое показываем
    const startItemIndex = (page - 1) * itemsOnPage || 1;
    let lastItemIndex =
      (startItemIndex === 1 ? 0 : startItemIndex) + itemsOnPage;
    lastItemIndex = lastItemIndex > totalCount ? totalCount : lastItemIndex;
    const shouldShowLastIndex = startItemIndex !== lastItemIndex;
    const shownItemsRange =
      totalCount > 0
        ? `${startItemIndex}${
            shouldShowLastIndex ? ` - ${lastItemIndex}` : ""
          } из ${totalCount}`
        : "";

    const pagesCount = Math.ceil(totalCount / itemsOnPage);

    // Количество соседей + первая страница + последняя страница + текущая и по 2 для точек
    const totalPageNumbers = siblingsCount + 5;

    // 1. Точек нет нигде
    if (totalPageNumbers >= pagesCount) {
      return {
        pagesCount,
        shownItemsRange,
        paginationRange: range(1, pagesCount)
      };
    }

    /**
     * Вычислиям левый и правый индекс соседей и смотрим,
     * что они находятся в пределах диапазона 1 и pagesCount
     */
    const leftSiblingIndex = Math.max(page - siblingsCount, 1);
    const rightSiblingIndex = Math.min(page + siblingsCount, pagesCount);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < pagesCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = pagesCount;

    // 2. Слева точек нет, а справа есть
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 2 + 2 * siblingsCount;
      let leftRange = range(1, leftItemCount);

      return {
        pagesCount,
        shownItemsRange,
        paginationRange: [...leftRange, DOTS, pagesCount]
      };
    }

    // 3. Справа точек нет, а слева есть
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingsCount;
      let rightRange = range(pagesCount - rightItemCount + 1, pagesCount);
      return {
        pagesCount,
        shownItemsRange,
        paginationRange: [firstPageIndex, DOTS, ...rightRange]
      };
    }

    // 4. Точки есть и справа и слева
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return {
        pagesCount,
        shownItemsRange,
        paginationRange: [
          firstPageIndex,
          DOTS,
          ...middleRange,
          DOTS,
          lastPageIndex
        ]
      };
    }

    return {pagesCount, shownItemsRange, paginationRange: []};
  }, [page, itemsOnPage, totalCount, siblingsCount]);

  return paginationData;
};

export default usePagination;
