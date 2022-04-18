import React, {ReactText} from "react";

import {
  MultiselectFilterType,
  RangeFilterType,
  TextFilterProps
} from "../../types";

import {MultiSelect} from "../../../MultiSelect";
import {Button} from "../../../Button";
import {Hint} from "../../../Hint";
import {TextInput} from "../../../TextInput";
import {CheckBox} from "../../../CheckBox";

import "./filters.scss";

export const TextFilter: React.FC<TextFilterProps> = ({
  filter = {value: "", options: "like"},
  onFilterChange,
  filterPlaceholder,
  filterTitle
}) => {
  const [val, setVal] = React.useState<string>();
  const [searchType, setSearchType] = React.useState<"like" | "equal">("like");

  React.useEffect(() => {
    if (filter?.value) {
      setVal(filter?.value || "");
      setSearchType((filter?.options as "like" | "equal") || "like");
    }
  }, [filter]);

  const submitFilter = React.useCallback(() => {
    onFilterChange({value: val, options: searchType as string});
  }, [val, onFilterChange, searchType]);

  const clearFilter = React.useCallback(() => {
    setVal("");
    onFilterChange({value: "", options: searchType as string});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFilterChange, searchType, val]);

  const handleTypeChange = (val?: string | number) => {
    setSearchType(`${val}` as "like" | "equal");
  };

  return (
    <div className="Table__Filters-text-filter-container">
      <TextInput
        onChange={setVal}
        value={val || ""}
        placeholder={filterPlaceholder}
        label={filterTitle}
      />
      <div className="full-width-container">
        <div className="Table__Filters-checkbox-container">
          <CheckBox
            label="Включает"
            value="like"
            checked={searchType === "like"}
            onChange={handleTypeChange}
            checkBoxType="secondary"
          />
        </div>
        <CheckBox
          label="Равно"
          value="equal"
          checked={searchType === "equal"}
          onChange={handleTypeChange}
          checkBoxType="secondary"
        />
      </div>
      <Button content="Применить" onClick={submitFilter} />
      <span className="Table__Filters-close" onClick={clearFilter}>
        очистить фильтр
      </span>
    </div>
  );
};

export const textFilterFunction = (
  rowValue: any,
  filter: {value?: any; options?: any}
) => {
  if (!filter?.value) return true;
  if (filter?.options === "equal") {
    return (
      `${rowValue}`.toLocaleLowerCase() ===
      `${filter?.value}`.toLocaleLowerCase()
    );
  }
  if (
    `${rowValue}`
      .toLocaleLowerCase()
      .includes(`${filter?.value}`.toLocaleLowerCase())
  ) {
    return true;
  }
  return false;
};

export const RangeFilter: React.FC<RangeFilterType> = ({
  filterData = [0, 100],
  filter = {value: []},
  onFilterChange
}) => {
  const [[min, max], setRangeValue] = React.useState<[string?, string?]>([]);

  const {
    //@ts-ignore
    value: [minValue, maxValue]
  } = filter;

  React.useEffect(() => {
    setRangeValue([
      `${minValue || filterData[0]}`,
      `${maxValue || filterData[1]}`
    ]);
  }, [minValue, maxValue, filterData]);

  const submitFilter = React.useCallback(() => {
    onFilterChange({
      value: [min ? +min : filterData[0], max ? +max : filterData[1]]
    });
  }, [min, max, onFilterChange, filterData]);

  const clearFilter = React.useCallback(() => {
    setRangeValue([`${filterData[0]}`, `${filterData[1]}`]);
    onFilterChange({value: []});
  }, [filterData, onFilterChange]);

  const handleChangeMin = React.useCallback((val = undefined) => {
    const hasMinus = val[0] === "-";
    const newVal = val.replace(/\D/g, "");
    setRangeValue(([_prevMin, prevMax]) => [
      `${hasMinus ? "-" : ""}${newVal}`,
      prevMax
    ]);
  }, []);

  const handleChangeMax = React.useCallback((val = undefined) => {
    const hasMinus = val[0] === "-";
    const newVal = val.replace(/\D/g, "");
    setRangeValue(([prevMin]) => [prevMin, `${hasMinus ? "-" : ""}${newVal}`]);
  }, []);

  const subminDisabled = !!min && !!max && +min > +max;

  return (
    <div className="Table__Filters-text-filter-container">
      <div className="Table__Filters-range-filter-container">
        <TextInput
          value={`${min || ""}`}
          label="Мин"
          onChange={handleChangeMin}
        />
        <TextInput onChange={handleChangeMax} value={max} label="Макс" />
      </div>
      <Hint
        content="Минимальное значение не может быть больше максимального"
        position="bottom"
        visible={subminDisabled}
      >
        <Button
          disabled={subminDisabled}
          content="Применить"
          onClick={submitFilter}
          className="Table__Filters-range-filter-container-button"
        />
      </Hint>
      <span className="Table__Filters-close" onClick={clearFilter}>
        сбросить фильтр
      </span>
    </div>
  );
};

export const rangeFilterFunction = (
  rowValue: any,
  filter: {value: [number?, number?]}
) => {
  if (!filter?.value?.length) return true;
  const [min, max] = filter.value;
  const val = (typeof rowValue === "string" ? +rowValue : rowValue) as number;
  if (typeof min !== "undefined" && val < min) {
    return false;
  }
  if (typeof max !== "undefined" && val > max) {
    return false;
  }
  return true;
};

export const MultiselectFilter: React.FC<MultiselectFilterType> = ({
  filterData = [],
  filter = {value: []},
  onFilterChange,
  filterTitle = ""
}) => {
  const [values, setValues] = React.useState<ReactText[]>([]);
  const submitFilter = React.useCallback(() => {
    onFilterChange({
      value: values
    });
  }, [values, onFilterChange]);

  const clearFilter = React.useCallback(() => {
    setValues([]);
    onFilterChange({value: []});
  }, [onFilterChange]);

  return (
    <div className="Table__Filters-text-filter-container">
      <MultiSelect
        placeholder={filterTitle}
        values={values}
        onChange={setValues}
        data={filterData}
        maxVisible={40}
      />
      <Button content="Применить" onClick={submitFilter} />
      <span className="Table__Filters-close" onClick={clearFilter}>
        очистить фильтр
      </span>
    </div>
  );
};

export const multiselectFilterFunction = (
  rowValue: any,
  filter: {value: ReactText[]}
) => (filter.value.length === 0 ? true : !!filter?.value?.includes(rowValue));
