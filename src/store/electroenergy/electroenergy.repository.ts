import {action, makeObservable, observable} from "mobx";
import {ElectroenergyItem} from "./models/electroenergy.model";
import {NotificationsRepository} from "../notifications/notifications.repository";
import {Knu, kvv, Nt} from "src/constants/electroenergy";
import uid from "src/utils/uid";

export class ElectroenergyRepository {
  @observable data: ElectroenergyItem[];
  @observable reclosersCount: number;
  @observable SAIFI: number | null = null;
  @observable SAIDI: number | null = null;
  @observable savedCalculatedData: {
    id: string;
    SAIDI: number;
    SAIFI: number;
    reclosersCount: number;
  }[] = [];

  private readonly notificationStore: NotificationsRepository;

  constructor(notificationStore: NotificationsRepository) {
    makeObservable(this);

    this.notificationStore = notificationStore;

    this.reclosersCount = 0;
    this.data = [new ElectroenergyItem(this.notificationStore)];
  }

  @action addReclouser() {
    this.reclosersCount += 1;
    this.data = [...this.data, new ElectroenergyItem(this.notificationStore)];
  }

  @action removeReclouser() {
    if (this.reclosersCount === 0) {
      return;
    }

    this.reclosersCount -= 1;
    this.data = this.data.slice(0, -1);
  }

  @action calculate() {
    this.data.forEach((i) => {
      i.calculateW(this.reclosersCount === 0 ? 0.6 : Knu);
      i.calculateT(this.reclosersCount === 0 ? 1 : kvv);
    });

    if (this.data.some((i) => i.W === null || i.T === null)) {
      this.SAIFI = null;
      this.SAIDI = null;
      this.notificationStore.addNotification({
        title: "Ошибка",
        message: "Не хватает одного из слагаемых",
        kind: "error"
      });
      return;
    }

    this.SAIFI = this.calculateSAIFI();
    this.SAIDI = this.calculateSAIDI();
  }

  @action saveCalculatedData() {
    if (this.SAIDI && this.SAIFI) {
      this.savedCalculatedData = [
        ...this.savedCalculatedData,
        {
          id: uid(),
          SAIDI: this.SAIDI,
          SAIFI: this.SAIFI,
          reclosersCount: this.reclosersCount
        }
      ].sort((a, b) => a.reclosersCount - b.reclosersCount);
    }
  }

  @action removeCalculatedDataItem(id: string) {
    this.savedCalculatedData = this.savedCalculatedData.filter(
      (i) => i.id !== id
    );
  }

  private calculateSAIFI() {
    const value =
      this.data.reduce<number>((acc, i) => {
        return acc + (i.W as number) * (i.N as number);
      }, 0) / Nt;

    return parseFloat(value.toFixed(2));
  }

  private calculateSAIDI() {
    const value = this.data.reduce<number>((acc, i) => {
      return acc + ((i.T as number) * (i.N as number)) / Nt;
    }, 0);

    return parseFloat(value.toFixed(2));
  }
}
