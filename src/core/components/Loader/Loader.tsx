import React from "react";

import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classnames from "classnames";

import "./loader.scss";

type LoaderProps = {
  isLoading: boolean;
  kind?: "full" | "fixed" | "partial";
  children?: React.ReactNode;
  text?: string;
  spinnerClassName?: string;
};

export const Loader: React.FC<LoaderProps> = React.memo(
  ({
    isLoading = false,
    kind = "full",
    children,
    text = "Загрузка...",
    spinnerClassName
  }) => {
    if (kind === "partial") {
      return (
        <FontAwesomeIcon
          className={classnames("Loader__icon", spinnerClassName)}
          size="1x"
          icon={faCircleNotch}
          spin={isLoading}
        />
      );
    }

    if (!children) {
      if (!isLoading) return null;
      return (
        <div
          className={classnames(["Loader", kind === "fixed" && "Loader_fixed"])}
        >
          <div className="Loader__content">
            <FontAwesomeIcon
              className={classnames("Loader__icon", spinnerClassName)}
              size={kind === "fixed" ? "1x" : "7x"}
              icon={faCircleNotch}
              spin={isLoading}
            />
            <span>{text}</span>
          </div>
        </div>
      );
    }
    return (
      <div>
        {children}
        {isLoading && (
          <div
            className={classnames([
              "Loader",
              kind === "fixed" && "Loader_fixed"
            ])}
          >
            <div className="Loader__content">
              <FontAwesomeIcon
                className={classnames("Loader__icon", spinnerClassName)}
                size={kind === "fixed" ? "1x" : "7x"}
                icon={faCircleNotch}
                spin={isLoading}
              />
              <span>Загрузка...</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);
