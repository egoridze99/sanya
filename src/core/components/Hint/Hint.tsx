import React from "react";

import "./hint.scss";
import classnames from "classnames";

type HintProps = {
  content: React.ReactChild;
  visible?: boolean;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
};

export const Hint: React.FC<HintProps> = React.memo(
  ({content = "", visible = true, children, position = "top"}) => {
    return (
      <div className="Hint">
        {visible && (
          <div
            className={classnames([
              "Hint__body",
              position === "bottom" && "Hint__body_bottom",
              position === "left" && "Hint__body_left",
              position === "right" && "Hint__body_right"
            ])}
          >
            {content}
          </div>
        )}
        {children}
      </div>
    );
  }
);
