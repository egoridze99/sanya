import {action, makeObservable, observable} from "mobx";
import {ElectroenergyItem} from "./models/electroenergy.model";

export class ElectroenergyRepository {
  @observable data: ElectroenergyItem[] = [];
  @observable reclosersCount: number = 0;

  constructor() {
    makeObservable(this);
  }

  @action addReclouser() {
    this.reclosersCount += 1;
    this.data = [...this.data, new ElectroenergyItem()];
  }

  @action removeReclouser() {
    if (this.reclosersCount === 0) {
      return;
    }

    this.reclosersCount -= 1;
    this.data = this.data.slice(0, -1);
  }

  @action calculate() {}
}
