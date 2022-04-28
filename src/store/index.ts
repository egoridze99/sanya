import {ElectroenergyRepository} from "./electroenergy/electroenergy.repository";
import {NotificationsRepository} from "./notifications/notifications.repository";

const notifications = new NotificationsRepository();
const electroenergy = new ElectroenergyRepository(notifications);

export const store = {
  electroenergy,
  notifications
};

//@ts-ignore
window.store = store;
