import uid from "src/utils/uid";

export class ElectroenergyItem {
  readonly id: string;

  constructor() {
    this.id = uid();
  }
}
