import React, {useCallback, useEffect, useMemo, useState} from "react";
import Menu from "./Menu";
import {Button} from "..";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {TextInput} from "../TextInput";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import useFilter from "./useFilter";
import {Popover} from "react-tiny-popover";
import useOutsideClick from "src/utils/hooks/useOutsideClick";
import useDebounce from "src/utils/hooks/useDebounce";

import "./dropdown.scss";

type Position = "top" | "right" | "bottom" | "left";
type PopoverPosition = Array<Position>;

interface Props {
  filterable?: boolean;
  filterPlaceholder?: string;
  items?: any[];
  onChange?: (value: any) => void;
  onItemClick?: (item: any) => void;
  value?: any | any[] | null;
  isMulti?: boolean;
  itemRender?: (item: any) => JSX.Element;
  valueRender?: (item: any) => JSX.Element;
  keyProperty?: string;
  labelProperty?: string;
  visibleRowsCount?: number;
  popupWidth?: number;
  placeholder?: string;
  buttonType?: "text-dropdown" | "icon-dropdown";
  buttonIcon?: IconProp;
  disabled?: boolean;
  positions?: PopoverPosition;
  clearable?: boolean;
}

export const Dropdown = ({
  filterable = false,
  filterPlaceholder = "Поиск...",
  items = [],
  onChange = () => {},
  value = null,
  itemRender,
  keyProperty = "id",
  labelProperty = "label",
  visibleRowsCount = 10,
  popupWidth = 200,
  placeholder = "",
  valueRender,
  buttonType = "text-dropdown",
  buttonIcon = "accusoft",
  disabled = false,
  positions = ["bottom", "right", "left", "top"],
  clearable = true
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string | undefined>("");
  const rootRef = React.useRef(null);

  const debounceFilterValue = useDebounce(filterValue, 1000);
  useOutsideClick(rootRef, () => setIsOpen(false));

  const filterableItems = useFilter(
    items,
    debounceFilterValue,
    filterable,
    labelProperty
  );

  useEffect(() => {
    setFilterValue("");
  }, [isOpen]);

  const onItemClick = useCallback(
    (item) => {
      onChange(item[keyProperty]);
      setIsOpen(false);
    },
    [keyProperty, onChange]
  );

  const buttonText = useMemo(() => {
    if (buttonType === "icon-dropdown") {
      return "";
    }
    if (items && items.length && value != null) {
      const item = items.find((d) => d[keyProperty] === value);
      if (valueRender) {
        return valueRender(item);
      } else {
        return item ? item[labelProperty] : "";
      }
    }
    return placeholder || "Выбор значения";
  }, [
    value,
    items,
    placeholder,
    valueRender,
    buttonType,
    keyProperty,
    labelProperty
  ]);

  const onFilterChange = (text) => {
    setFilterValue(text);
  };

  const clear = () => {
    onChange(null);
    setIsOpen(false);
  };

  const popupContent = (
    <div ref={rootRef}>
      <div className="Dropdown" style={{width: `${popupWidth}px`}}>
        {filterable && (
          <div className={"Dropdown__input"}>
            <TextInput
              value={filterValue}
              onChange={onFilterChange}
              clearable={true}
              placeholder={filterPlaceholder}
              beforeIcon={faSearch}
            />
          </div>
        )}
        <Menu
          items={filterableItems}
          value={value}
          visibleRowsCount={visibleRowsCount}
          width={popupWidth}
          keyProperty={keyProperty}
          labelProperty={labelProperty}
          itemRender={itemRender}
          onItemClick={onItemClick}
        />
      </div>
    </div>
  );

  const popupChildren = (
    <div style={{width: "fit-content", height: "fit-content"}}>
      <Button
        content={buttonText}
        onClick={() => setIsOpen((prev) => !prev)}
        buttonType={buttonType}
        icon={buttonIcon}
        disabled={disabled}
        clearIconVisible={clearable ? !!value : clearable}
        onClearClick={clear}
      />
    </div>
  );

  return (
    <Popover
      isOpen={isOpen}
      content={popupContent}
      positions={positions}
      align="start"
    >
      {popupChildren}
    </Popover>
  );
};
