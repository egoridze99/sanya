import {useMemo} from "react";

export default (
  items: any[],
  filterValue: string | undefined,
  filterable: boolean,
  labelProperty
) => {
  return useMemo(() => {
    if (filterable && items && filterValue && filterValue.length > 1) {
      const value = items.filter((item) => {
        if (item[labelProperty]) {
          const text = item[labelProperty].toLowerCase();
          return text.includes(filterValue.toLowerCase());
        }
        return false;
      });
      return value;
    } else {
      return items;
    }
  }, [filterable, items, filterValue, labelProperty]);
};
