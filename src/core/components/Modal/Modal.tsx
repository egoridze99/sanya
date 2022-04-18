import React from "react";
import ReactDOM from "react-dom";
import {Button, ButtonProps} from "../Button";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

import defaultCloseIcon from "./assets/closeIcon.svg";

import "./modal.scss";

import classnames from "classnames";

type ModalProps = {
  title?: React.ReactNode;
  onActionClick: () => void;
  visible?: boolean;
  width?: string;
  height?: string;
  children?: React.ReactNode;
  buttonProps?: ButtonProps;
  actionIcon?: IconProp;
  actionIconColor?: string;
  aboveAll?: boolean;
  global?: boolean;
};

export const Modal: React.FC<ModalProps> = React.memo(
  ({
    title = "",
    width,
    visible = false,
    onActionClick,
    children,
    buttonProps,
    height,
    actionIcon,
    actionIconColor = "",
    aboveAll = false,
    global = true
  }) => {
    const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
    };

    const closeIcon = actionIcon ? (
      <FontAwesomeIcon style={{color: actionIconColor}} icon={actionIcon} />
    ) : (
      <img src={defaultCloseIcon} alt="X" />
    );

    const modal = (
      <div
        className={classnames([
          "Modal",
          aboveAll && "Modal_above-all",
          visible && "Modal_visible"
        ])}
        onClick={onClick}
      >
        <div className={"Modal__body"} style={{width: width || 600}}>
          <div className={"Modal__header"}>
            <h1 className="Modal__title">
              {title}
              {!!buttonProps && <Button {...buttonProps} />}
            </h1>
            <div className="Modal__close" onClick={onActionClick}>
              {closeIcon}
            </div>
          </div>
          <div className="Modal__content" style={{height: height || "auto"}}>
            {children}
          </div>
        </div>
      </div>
    );

    return global ? ReactDOM.createPortal(modal, document.body) : modal;
  }
);
