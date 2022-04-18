import React, {ReactNode} from "react";
import {
  RowGroupData,
  RowGroupHeader as RowGroupHeaderType,
  RowGroupItem
} from "../types";
import {last} from "ramda";

type UseTableDataArgs = {
  sortedData: any[];
  hasRowGrouping: boolean;
  uniqueKey: string;
  page: number;
  itemsOnPage: number;

  groupByFieldName?: string;
  groupedData?: Record<string, any[]>;
  groupValueForOutsiders?: string;
  headerCustomRender?: (
    rowGroupFieldName: string,
    isExpanded: boolean,
    rowGroupItem?: RowGroupItem<any>
  ) => ReactNode;
  rowGroupsState: Record<string, boolean>;
  dataForRowGroupsHeaderAsDict: Record<string, RowGroupItem<any>[]>;
  rowGroupDataForEveryItem: Record<string, RowGroupData<any>>;
};

export const useTableData = ({
  sortedData,
  groupedData,
  hasRowGrouping,
  groupValueForOutsiders,
  headerCustomRender,
  rowGroupsState,
  dataForRowGroupsHeaderAsDict,
  rowGroupDataForEveryItem,
  uniqueKey,
  page,
  itemsOnPage,
  groupByFieldName
}: UseTableDataArgs) => {
  const dataToShow = React.useMemo(() => {
    let allData: any = [...sortedData];

    if (!allData.length) {
      return [];
    }

    if (hasRowGrouping && groupedData) {
      const groups = [
        ...Object.keys(groupedData)
          .filter((group) => group !== groupValueForOutsiders)
          .sort(),
        groupValueForOutsiders
      ];

      allData = groups.reduce<any[]>((acc, groupName) => {
        const rowGroupHeader: RowGroupHeaderType = {
          groupName: groupName || "",
          render: headerCustomRender
            ? (groupName: string) =>
                (headerCustomRender as Function)(
                  groupName,
                  rowGroupsState[groupName],
                  dataForRowGroupsHeaderAsDict[groupName]
                )
            : undefined,
          isGroupHeader: true,
          isExpanded: rowGroupsState[groupName || ""]
        };

        const data = groupedData[groupName || ""];
        if (!data) {
          return [...acc, rowGroupHeader];
        }
        rowGroupDataForEveryItem[data[0][uniqueKey]].isFirst = true;
        rowGroupDataForEveryItem[
          data[data.length - 1][uniqueKey]
        ].isLast = true;

        return rowGroupHeader.isExpanded
          ? [...acc, rowGroupHeader, ...data]
          : [...acc, rowGroupHeader];
      }, [] as any);
    }

    return allData;
  }, [sortedData, headerCustomRender, groupedData, rowGroupsState]);

  const pageableData = React.useMemo(() => {
    const startIndex = page;
    let dataToSelectedPage = dataToShow.slice(
      startIndex * itemsOnPage,
      startIndex * itemsOnPage + itemsOnPage
    );

    if (!hasRowGrouping) {
      return dataToSelectedPage;
    }

    if (dataToSelectedPage[0] && !dataToSelectedPage[0]?.isGroupHeader) {
      const firstItemGroupName =
        dataToSelectedPage[0][groupByFieldName || ""] || groupValueForOutsiders;
      dataToSelectedPage = [
        {
          groupName: firstItemGroupName,
          render: headerCustomRender
            ? (groupName: string) =>
                (headerCustomRender as Function)(
                  groupName,
                  rowGroupsState[groupName],
                  dataForRowGroupsHeaderAsDict[groupName]
                )
            : undefined,
          isGroupHeader: true,
          isExpanded: rowGroupsState[firstItemGroupName],
          couldBeCollapsed: false
        } as RowGroupHeaderType,
        ...dataToSelectedPage
      ];
    }

    const lastItem = (last(
      dataToSelectedPage
    ) as unknown) as RowGroupHeaderType;
    if (lastItem && lastItem?.isGroupHeader && lastItem?.isExpanded) {
      dataToSelectedPage = [
        ...dataToSelectedPage.slice(0, -1),
        {
          groupName: lastItem.groupName,
          displayGroupName: `${lastItem.groupName} (Продолжение на следующей странице)`,
          render: lastItem.render,
          isGroupHeader: true,
          isExpanded: lastItem.isExpanded
        } as RowGroupHeaderType
      ];
    }

    return dataToSelectedPage;
  }, [page, itemsOnPage, dataToShow, rowGroupsState]);

  return {itemsCount: dataToShow.length, pageableData};
};
