import React, {useEffect, useRef} from "react";

import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {IconProp} from "@fortawesome/fontawesome-svg-core";
import classnames from "classnames";

import "./textInput.scss";

type TextAreaProps = {
  placeholder?: string;
  name?: string;
  value?: string;
  label?: string;
  maxLength?: number;
  onChange?: (text: string) => void;
  actionIcon?: IconProp;
  clearable?: boolean;
  className?: string;
  onAction?: () => void;
  onSubmit?: () => void;
  type?: "string" | "number" | "password";
  min?: number;
  max?: number;
  disabled?: boolean;
  beforeIcon?: IconProp;
  inputType?: "primary" | "secondary" | "danger";
  autoFocus?: boolean;
  onClear?: () => void;
};

export const TextInput: React.FC<TextAreaProps> = React.memo(
  ({
    placeholder,
    name,
    value = "",
    label,
    onChange,
    clearable,
    actionIcon,
    className,
    onAction,
    type = "string",
    max,
    min,
    onSubmit,
    disabled = false,
    beforeIcon,
    inputType = "primary",
    autoFocus = false,
    onClear = () => {}
  }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (autoFocus) {
        inputRef.current && inputRef.current.focus();
      }
    }, [autoFocus]);

    const onChangeTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event?.target && !!onChange) {
        if (type === "number") {
          const v = event.target?.value?.replace(/\D/g, "");
          if (v && typeof max !== "undefined" && +v > max) {
            onChange(`${max}`);
          } else if (v && typeof min !== "undefined" && +v < min) {
            onChange(`${min}`);
          } else {
            onChange(v);
          }
        } else {
          onChange(event.target?.value || "");
        }
      }
    };

    const clearInput = React.useCallback(() => {
      if (onChange) onChange("");
      onClear();
    }, [onChange, onClear]);

    const handleInputSumbit = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter" && !!onSubmit) {
        onSubmit();
      }
    };

    return (
      <div
        className={classnames("TextInput", className, {
          TextInput_primary: inputType === "primary",
          TextInput_danger: inputType === "danger"
        })}
      >
        {label && <label htmlFor={name}>{label}</label>}
        {!!beforeIcon && (
          <div className="TextInput__before-icon">
            <FontAwesomeIcon icon={beforeIcon} />
          </div>
        )}
        <input
          className={classnames(
            "TextInput__text-input",
            !!beforeIcon && "TextInput__text-input_with-offset"
          )}
          ref={inputRef}
          onChange={onChangeTextInput}
          name={name}
          placeholder={placeholder}
          value={value}
          onKeyDown={handleInputSumbit}
          disabled={disabled}
          type={type === "password" ? "password" : "text"}
        />
        {clearable && (
          <div
            className="TextInput__clear-icon"
            style={{right: !!actionIcon ? "31px" : 0}}
            onClick={clearInput}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        )}
        <div className="TextInput__buttons-container">
          {!!actionIcon && (
            <div className="TextInput__button-item" onClick={onAction}>
              <FontAwesomeIcon icon={actionIcon} />
            </div>
          )}
        </div>
      </div>
    );
  }
);
