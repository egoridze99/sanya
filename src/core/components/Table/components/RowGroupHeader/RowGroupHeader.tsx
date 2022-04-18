import React from "react";
import {ReactComponent as ArrowIcon} from "../../assets/arrow.svg";
import classnames from "classnames";
import {CheckBox} from "../../../CheckBox";

import "./rowGroupHeader.scss";
import {CHECKBOX_COLUMN_WIDTH} from "../../constants";

type RowGroupHeaderProps = {
  couldBeCollapsed?: boolean;
  isExpanded: boolean;
  groupName: string;
  render?: (groupName: string) => React.ReactNode;
  rowsHeight: number;
  onGroupExpand: () => void;
  checkboxOptions?: {
    checked: boolean | "part";
    onGroupCheck: (value: boolean | "part") => void;
  };
};

const RowGroupHeader: React.FC<RowGroupHeaderProps> = ({
  groupName,
  isExpanded,
  render,
  rowsHeight,
  onGroupExpand,
  couldBeCollapsed,
  checkboxOptions
}) => {
  couldBeCollapsed =
    typeof couldBeCollapsed === "undefined" ? true : couldBeCollapsed;

  const content = React.useMemo(() => {
    return render ? (
      render(groupName)
    ) : (
      <div className="RowGroupHeader__text">{groupName}</div>
    );
  }, [render, groupName]);

  const onRowClick = () => {
    if (isExpanded && !couldBeCollapsed) {
      return;
    }

    onGroupExpand();
  };

  return (
    <tr
      style={{height: rowsHeight}}
      onClick={onRowClick}
      className={classnames("Table__Row", "RowGroupHeader", {
        RowGroupHeader_blocked: isExpanded && !couldBeCollapsed
      })}
    >
      {checkboxOptions && (
        <th className="RowGroupHeader__checkbox">
          <div
            className="RowGroupHeader__checkbox-container"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              checkboxOptions.onGroupCheck(checkboxOptions.checked);
            }}
          >
            <CheckBox checked={checkboxOptions.checked} />
          </div>
        </th>
      )}
      <th
        style={{left: checkboxOptions ? CHECKBOX_COLUMN_WIDTH : 0}}
        className={classnames("RowGroupHeader__arrow-icon", {
          "RowGroupHeader__arrow-icon_expanded": isExpanded
        })}
      >
        <div>
          <ArrowIcon />
        </div>
      </th>
      <td colSpan={100}>
        <div
          className={classnames("RowGroupHeader__title", {
            RowGroupHeader__title_sticky: !render,
            "RowGroupHeader__title_sticky-with-offset": !!checkboxOptions,
            "RowGroupHeader__title_sticky-without-offset": !checkboxOptions
          })}
        >
          {content}
        </div>
      </td>
    </tr>
  );
};

export default RowGroupHeader;
