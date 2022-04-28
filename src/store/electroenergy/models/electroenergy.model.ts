import uid from "src/utils/uid";
import {action, makeObservable, observable} from "mobx";
import {NotificationsRepository} from "../../notifications/notifications.repository";
import {T, W0} from "src/constants/electroenergy";

export class ElectroenergyItem {
  readonly id: string;

  @observable W: number | null = null;
  @observable N: number | null = null;
  @observable L: number | null = null;
  @observable T: number | null = null;

  private readonly notificationStore: NotificationsRepository;

  constructor(notificationStore: NotificationsRepository) {
    makeObservable(this);
    this.id = uid();

    this.notificationStore = notificationStore;
  }

  @action setN(val: string) {
    this.N = this.getNumberValueToSet(val);
  }

  @action setL(val: string) {
    this.L = this.getNumberValueToSet(val);
  }

  @action calculateW(Knu: number) {
    this.W = null;
    if (!this.N || !this.L) {
      return;
    }

    const value = 0.01 * W0 * (1 - Knu) * this.L;
    this.W = parseFloat(value.toFixed(2));
  }

  @action calculateT(kvv: number) {
    this.T = null;
    if (!this.N || !this.W) {
      return;
    }

    const value = this.W * T * kvv;
    this.T = parseFloat(value.toFixed(2));
  }

  private getNumberValueToSet(val: string) {
    const parsedValue = parseFloat(val);

    if (isNaN(parsedValue)) {
      this.notificationStore.addNotification({
        title: "Ошибка",
        message: "Вы ввели нечисловое значение",
        kind: "error"
      });
      return 0;
    }

    return parsedValue;
  }
}
