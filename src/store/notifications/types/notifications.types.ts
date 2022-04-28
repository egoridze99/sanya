import React from "react";

export type NotificationKind = "info" | "error" | "warn" | "success";

export type NotificationType = {
  id?: string;
  kind?: NotificationKind;
  message?: React.ReactNode;
  actionContent?: React.ReactNode;
  title?: string;
  timeout?: number | null;
};
