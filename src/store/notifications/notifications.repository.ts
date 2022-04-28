import {action, makeObservable, observable} from "mobx";
import {NotificationType} from "./types/notifications.types";
import uid from "../../utils/uid";

export class NotificationsRepository {
  /**
   * Массив уведомлений
   */
  @observable notifications: NotificationType[] = [];

  constructor() {
    makeObservable(this);
  }

  /**
   * Добавить уведомление
   * @param notification уведомление
   */
  @action addNotification(notification: NotificationType) {
    const notificationId = uid("notif");
    notification = {
      ...notification,
      id: notificationId
    };

    if (notification.timeout !== null) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, notification.timeout || 5000);
    }

    let title = notification.title;
    if (!title) {
      switch (notification.kind) {
        case "error":
          title = "Ошибка";
          break;
        case "warn":
          title = "Предупреждение";
          break;
        case "success":
          title = "Успех";
          break;
        default:
          title = "Информация";
      }
    }

    this.notifications.push(notification);
    return notification;
  }

  /**
   * Удалить уведомление
   * @param notification уведомление
   */
  @action removeNotification(notification: NotificationType) {
    const notification_id = notification.id;

    this.notifications = this.notifications.filter(
      ({id}) => id !== notification_id
    );
  }

  /**
   * Очистить уведомления
   */
  @action clearNotifications = () => {
    this.notifications = [];
  };
}
