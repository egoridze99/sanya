import React from "react";
import uid from "src/utils/uid";
import classnames from "classnames";

import "./checkBox.scss";

export type CheckBoxProps = {
  value?: string | number;
  label?: React.ReactNode;
  checked?: boolean | "part";
  onChange?: (value: CheckBoxProps["value"]) => void;
  disabled?: boolean;
  className?: string;
  checkBoxType?: "secondary" | "success" | "error" | "primary";
};

export const CheckBox: React.FC<CheckBoxProps> = React.memo(
  ({
    value,
    label,
    checked = false,
    onChange = () => {},
    disabled = false,
    className = "",
    checkBoxType = "primary"
  }) => {
    const uniqueId = React.useRef(uid());

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target) {
          onChange(event.target.value);
        }
      },
      [onChange]
    );

    return (
      <div
        className={classnames("CheckBox", className, {
          CheckBox_part: checked === "part",
          "CheckBox_with-label": !!label,
          CheckBox_secondary: checkBoxType === "secondary",
          CheckBox_success: checkBoxType === "success",
          CheckBox_error: checkBoxType === "error"
        })}
      >
        <input
          value={value}
          checked={!!checked}
          onChange={handleChange}
          type="checkbox"
          id={uniqueId.current}
          disabled={disabled}
        />
        <label htmlFor={uniqueId.current}>{label}</label>
      </div>
    );
  }
);
