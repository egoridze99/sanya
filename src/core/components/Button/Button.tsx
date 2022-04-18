import React, {SVGProps, useCallback} from "react";
import {ReactSVG} from "react-svg";

import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {ReactComponent as AngleDownIcon} from "./assets/angleDown.svg";
import {ReactComponent as CloseIcon} from "./assets/close.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import {Loader} from "..";

import "./button.scss";

export type ButtonProps = {
  title?: string;
  content?: React.ReactChild;
  onClick?: () => void;
  disabled?: boolean;
  buttonType?:
    | "primary"
    | "secondary"
    | "text-dropdown"
    | "icon-dropdown"
    | "icon"
    | "border-icon";
  size?: "regular" | "small";
  isLoading?: boolean;
  iconClassName?: string;
  icon?: IconProp;
  iconPath?: string | React.FC<SVGProps<SVGSVGElement>>;
  clearIconVisible?: boolean;
  onClearClick?: () => void;
  isActive?: boolean;
  width?: string;
  activeItemsCount?: number;
  maxActiveItemsCount?: number;
  className?: string;
};
const iconTypes = ["icon", "border-icon"];

export const Button: React.FC<ButtonProps> = React.memo(
  ({
    buttonType = "primary",
    content = "",
    disabled = false,
    icon,
    iconClassName = "",
    isLoading = false,
    size = "regular",
    title,
    onClick = () => {},
    clearIconVisible = false,
    onClearClick = () => {},
    isActive = false,
    iconPath = "",
    activeItemsCount,
    maxActiveItemsCount = 99,
    className
  }) => {
    const activeItemCountLabel = React.useMemo(() => {
      if (!activeItemsCount) {
        return null;
      }

      const content =
        activeItemsCount > maxActiveItemsCount
          ? `${maxActiveItemsCount}+`
          : activeItemsCount.toString();

      return (
        <div className="Button__active-items-count">
          <p className="Button__active-items-count-text">{content}</p>
        </div>
      );
    }, [activeItemsCount]);

    const isIcon = React.useMemo(() => iconTypes.includes(buttonType), [
      buttonType
    ]);

    const onClear = useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        onClearClick();
      },
      []
    );

    let button: JSX.Element;
    if (isIcon) {
      if (icon) {
        button = (
          <>
            <FontAwesomeIcon className={iconClassName} icon={icon} />
            {activeItemCountLabel}
          </>
        );
      } else {
        const Icon = iconPath;
        button = (
          <>
            {typeof iconPath === "string" ? (
              <ReactSVG className={iconClassName} src={iconPath} />
            ) : (
              <Icon
                className={classnames(
                  "Button_icon-react-element",
                  iconClassName
                )}
              />
            )}
            {activeItemCountLabel}
          </>
        );
      }
    } else if (buttonType === "text-dropdown") {
      button = (
        <>
          <span>{content}</span>
          <AngleDownIcon />
          {clearIconVisible && !disabled && (
            <div className="Button__clear" onClick={onClear}>
              <CloseIcon />
            </div>
          )}
          {activeItemCountLabel}
        </>
      );
    } else if (buttonType === "icon-dropdown" && icon) {
      button = (
        <>
          <FontAwesomeIcon icon={icon} />
          <AngleDownIcon />
          {clearIconVisible && !disabled && (
            <div className="Button__clear" onClick={onClear}>
              <CloseIcon />
            </div>
          )}
          {activeItemCountLabel}
        </>
      );
    } else {
      button = (
        <>
          {isLoading && (
            <Loader
              spinnerClassName={"Button__icon Button__loader"}
              kind="partial"
              isLoading={true}
            />
          )}
          {!!icon && !isLoading && (
            <FontAwesomeIcon icon={icon} className={"Button__icon"} />
          )}
          <span>{content}</span>
          {activeItemCountLabel}
        </>
      );
    }

    return (
      <button
        onClick={onClick}
        title={title}
        disabled={disabled}
        className={classnames("Button", className, {
          Button_small: size === "small",
          Button_active: isActive,
          Button_primary: buttonType === "primary",
          Button_secondary: buttonType === "secondary",
          Button_dropdown: buttonType === "text-dropdown",
          "Button_icon-dropdown": buttonType === "icon-dropdown",
          Button_icon: iconTypes.includes(buttonType),
          "Button_border-icon": buttonType === "border-icon",
          Button_disabled: disabled
        })}
      >
        {button}
      </button>
    );
  }
);
