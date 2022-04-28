import React from "react";
import "./notification.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

type NotificationProps = {
  kind?: "info" | "error" | "warn" | "success";
  content?: React.ReactNode;
  title: string;
  actionContent?: React.ReactNode;
  removeNotification?: () => void;
};

export const Notification: React.FC<NotificationProps> = ({
  content,
  kind = "info",
  title,
  actionContent,
  removeNotification
}) => {
  return (
    <div
      className={classnames("Notification", {
        Notification_success: kind === "success",
        Notification_error: kind === "error",
        Notification_warning: kind === "warn"
      })}
    >
      <div className="Notification__header">
        <h1 className="Notification__title">{title}</h1>
        <div className="Notification__header-controls">
          {actionContent}
          {removeNotification && (
            <div
              className="Notification__close-button"
              onClick={removeNotification}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="Notification__close-button-icon"
              />
            </div>
          )}
        </div>
      </div>
      <div className="Notification__body">{content}</div>
    </div>
  );
};
