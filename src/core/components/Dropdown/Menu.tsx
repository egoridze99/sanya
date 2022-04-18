import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FixedSizeList as List} from "react-window";

interface Props {
  items?: any[];
  onItemClick?: (item: any) => void;
  value?: any | null;
  itemRender?: (item: any) => JSX.Element;
  keyProperty?: string;
  labelProperty?: string;
  visibleRowsCount?: number;
  width?: number;
}

const SelectedIcon = () => (
  <FontAwesomeIcon className="Dropdown__selected-icon" icon={faCheck} />
);

const rowHeight = 36;

const Menu = ({
  items = [],
  value = null,
  itemRender,
  onItemClick = () => {},
  keyProperty = "id",
  labelProperty = "label",
  visibleRowsCount = 10,
  width = 200
}: Props) => {
  const onClick = (item: any) => {
    onItemClick(item);
  };

  const row = ({data, index, style}) => {
    const item = data[index];
    return (
      <div
        className="Dropdown__menu-item"
        style={{
          ...style
        }}
        key={item[keyProperty]}
        onClick={() => onClick(item)}
      >
        {itemRender ? itemRender(item) : item[labelProperty]}
        {item[keyProperty] === value && <SelectedIcon />}
      </div>
    );
  };

  return (
    <List
      height={visibleRowsCount * rowHeight}
      itemCount={items?.length}
      itemSize={rowHeight}
      itemData={items}
      width={width}
    >
      {row}
    </List>
  );
};

export default Menu;
