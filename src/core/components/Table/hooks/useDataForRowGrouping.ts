import React, {useCallback, useMemo} from "react";
import {RowGroupData, RowGroupItem} from "../types";
import {groupBy} from "ramda";

type UseDataForRowGrouping = {
  sortedData: any[];
  uniqueKey: string;
  setRowGroupsState: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  rowGroupsState: Record<string, boolean>;

  rowGroupItems?: RowGroupItem<any>[];
  groupByFieldName?: string;
  groupFieldNameForOutsiders?: string;
  selectedRows?: any[];
  onChangeSelectedRows?: (rows: any[]) => void;
};

export const useDataForRowGrouping = ({
  rowGroupItems,
  groupByFieldName,
  sortedData,
  groupFieldNameForOutsiders,
  uniqueKey,
  setRowGroupsState,
  selectedRows,
  onChangeSelectedRows,
  rowGroupsState
}: UseDataForRowGrouping) => {
  const dataForRowGroupsHeaderAsDict = useMemo(() => {
    if (!rowGroupItems) {
      return {};
    }

    return rowGroupItems.reduce<Record<string, any>>((acc, item) => {
      return {...acc, [item.name]: item};
    }, {});
  }, [rowGroupItems]);

  const groupedData = useMemo(() => {
    if (!groupByFieldName) {
      return {};
    }

    return groupBy(
      (row) =>
        row[groupByFieldName]
          ? row[groupByFieldName]
          : groupFieldNameForOutsiders,
      sortedData
    );
  }, [
    groupByFieldName,
    groupFieldNameForOutsiders,
    sortedData,
    dataForRowGroupsHeaderAsDict
  ]);

  const rowGroupDataForEveryItem = useMemo(() => {
    return Object.keys(groupedData).reduce<Record<string, RowGroupData<any>>>(
      (acc, groupName) => {
        const groupItems = groupedData[groupName];
        groupItems.forEach((item) => {
          acc[item[uniqueKey]] = {
            ...dataForRowGroupsHeaderAsDict[groupName]
          } || {
            fieldName: groupName
          };
        });

        return acc;
      },
      {}
    );
  }, [groupedData]);

  const isRowGroupChecked = useCallback(
    (groupName) => {
      if (!groupByFieldName || !selectedRows) {
        return false;
      }

      const groupData = groupedData[groupName];
      const searchInSelectedRows = (item) => {
        return selectedRows.some(
          (selectedItem) => selectedItem[uniqueKey] === item[uniqueKey]
        );
      };

      switch (true) {
        case groupData.every(searchInSelectedRows):
          return true;
        case groupData.some(searchInSelectedRows):
          return "part";
        default:
          return false;
      }
    },
    [groupedData, selectedRows]
  );

  const selectedGroupsData = useMemo(() => {
    if (!groupByFieldName) {
      return {};
    }

    const groups = Object.keys(groupedData);
    return groups.reduce<Record<string, boolean | "part">>((acc, group) => {
      acc[group] = isRowGroupChecked(group);

      return acc;
    }, {});
  }, [groupedData, isRowGroupChecked, selectedRows]);

  const expandRowGroup = useCallback(
    (rowGroup) => {
      setRowGroupsState((prev) => ({
        ...prev,
        [rowGroup]: !prev[rowGroup]
      }));
    },
    [setRowGroupsState]
  );

  const handleRowGroupCheck = useCallback(
    (val, groupName) => {
      if (!onChangeSelectedRows) {
        return;
      }

      if (!val) {
        onChangeSelectedRows([
          ...(selectedRows || []),
          ...groupedData[groupName]
        ]);
        return;
      }

      onChangeSelectedRows(
        (selectedRows || []).filter((item) => {
          return !groupedData[groupName].some(
            (groupItem) => groupItem[uniqueKey] === item[uniqueKey]
          );
        })
      );
    },
    [selectedRows, groupedData, onChangeSelectedRows]
  );

  const shouldExpandAllRowGroups = useMemo(() => {
    return Object.values(rowGroupsState).every((item) => !item);
  }, [rowGroupsState]);

  const toggleRowGroupExpanding = useCallback(() => {
    setRowGroupsState((prev) => {
      return Object.keys(prev).reduce((acc, item) => {
        return {...acc, [item]: shouldExpandAllRowGroups};
      }, {});
    });
  }, [setRowGroupsState, shouldExpandAllRowGroups]);

  React.useEffect(() => {
    if (!groupedData || !Object.keys(groupedData).length) {
      return;
    }

    setRowGroupsState((prev) =>
      Object.keys(groupedData).reduce<Record<string, boolean>>(
        (acc, groupName) => {
          return {...acc, [groupName]: prev[groupName] || false};
        },
        {} as any
      )
    );
  }, [groupedData]);

  return {
    rowGroupDataForEveryItem,
    expandRowGroup,
    handleRowGroupCheck,
    selectedGroupsData,
    dataForRowGroupsHeaderAsDict,
    groupedData,
    toggleRowGroupExpanding,
    shouldExpandAllRowGroups
  };
};
