import {action, makeObservable, observable} from "mobx";
import {ElectroenergyItem} from "./models/electroenergy.model";
import {NotificationsRepository} from "../notifications/notifications.repository";
import {Knu, kvv, Nt, T, W0} from "src/constants/electroenergy";
import * as Highcharts from "highcharts";
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
    this.saveCalculatedData();
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

  getGraphicsData(): {
    SAIDI: Highcharts.Options;
    SAIFI: Highcharts.Options;
    SAIFIAbs: Highcharts.Options;
    SAIDIAbs: Highcharts.Options;
  } {
    return {
      SAIDI: this.getSaidiGraphicsData(),
      SAIFI: this.getSaifiGraphicsData(),
      SAIFIAbs: this.getSaifiAbsGraphicsData(),
      SAIDIAbs: this.getSaidiAbsGraphicsData()
    };
  }

  private getSaifiGraphicsData(): Highcharts.Options {
    return {
      title: {
        align: "left",
        style: {fontSize: "14px"},
        text: "Зависимость показателя надежности SAIFI от количества реклоузеров"
      },
      yAxis: {
        title: {
          text: "SAIFI, откл/год"
        }
      },
      xAxis: {
        categories: this.savedCalculatedData.map((item) =>
          item.reclosersCount.toString()
        ),
        title: {
          text: "Количество реклоузеров, шт."
        }
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },
      series: [
        {
          name: "SAIFI(n)",
          type: "line",
          data: this.savedCalculatedData.map((item) => item.SAIFI)
        }
      ]
    };
  }

  private getSaifiAbsGraphicsData(): Highcharts.Options {
    const L = this.data.reduce<number>((acc, item) => {
      return acc + (item?.L as number) || 0;
    }, 0);

    if (!L) {
      return {};
    }

    const defaultSaifiValue = parseFloat((0.01 * W0 * 0.4 * L).toFixed(2));

    return {
      title: {
        align: "left",
        style: {fontSize: "14px"},
        text: "Зависимость показателя надежности SAIFI в процентах от количества реклоузеров относительно исходного режима"
      },
      yAxis: {
        title: {
          text: "SAIFI, %"
        }
      },
      xAxis: {
        categories: this.savedCalculatedData.map((item) =>
          item.reclosersCount.toString()
        ),
        title: {
          text: "Количество реклоузеров, шт."
        }
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },
      series: [
        {
          name: "SAIFI(n)",
          type: "line",
          data: this.savedCalculatedData.map((item) =>
            parseFloat(((defaultSaifiValue / item.SAIFI) * 100).toFixed(2))
          )
        }
      ]
    };
  }

  private getSaidiGraphicsData(): Highcharts.Options {
    return {
      title: {
        align: "left",
        style: {fontSize: "14px"},
        text: "Зависимость показателя надежности SAIDI от количества реклоузеров"
      },
      yAxis: {
        title: {
          text: "SAIDI, откл/год"
        }
      },
      xAxis: {
        categories: this.savedCalculatedData.map((item) =>
          item.reclosersCount.toString()
        ),
        title: {
          text: "Количество реклоузеров, шт."
        }
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },
      series: [
        {
          name: "SAIDI(n)",
          type: "line",
          data: this.savedCalculatedData.map((item) => item.SAIDI)
        }
      ]
    };
  }

  private getSaidiAbsGraphicsData(): Highcharts.Options {
    const L = this.data.reduce<number>((acc, item) => {
      return acc + (item?.L as number) || 0;
    }, 0);

    if (!L) {
      return {};
    }

    const defaultSaidiValue = parseFloat((0.01 * W0 * 0.4 * L * T).toFixed(2));

    return {
      title: {
        align: "left",
        style: {fontSize: "14px"},
        text: "Зависимость показателя надежности SAIDI в процентах от количества реклоузеров относительно исходного режима"
      },
      yAxis: {
        title: {
          text: "SAIDI, %"
        }
      },
      xAxis: {
        categories: this.savedCalculatedData.map((item) =>
          item.reclosersCount.toString()
        ),
        title: {
          text: "Количество реклоузеров, шт."
        }
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },
      series: [
        {
          name: "SAIDI(n)",
          type: "line",
          data: this.savedCalculatedData.map((item) =>
            parseFloat(((defaultSaidiValue / item.SAIFI) * 100).toFixed(2))
          )
        }
      ]
    };
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
