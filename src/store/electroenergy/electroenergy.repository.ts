import {action, makeObservable, observable} from "mobx";
import {ElectroenergyItem} from "./models/electroenergy.model";
import {NotificationsRepository} from "../notifications/notifications.repository";
import {C, Knu, kvv, KZT, Nt, T, W0} from "src/constants/electroenergy";
import * as Highcharts from "highcharts";
import uid from "src/utils/uid";

export class ElectroenergyRepository {
  @observable data: ElectroenergyItem[];
  @observable reclosersCount: number;
  @observable SAIFI: number | null = null;
  @observable SAIDI: number | null = null;
  @observable ENS: number | null = null;
  @observable Tok: number | null;

  @observable savedCalculatedData: {
    id: string;
    SAIDI: number;
    SAIFI: number;
    ENS: number;
    Tok: number;
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

    if (this.data.some((i) => i.W === null || i.T === null || i.P === null)) {
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
    this.ENS = this.calculateENS();
    this.Tok = this.calculateTok();
    this.saveCalculatedData();
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
    ENS: Highcharts.Options;
    Tok: Highcharts.Options;
  } {
    this.findUselessRecloser();

    return {
      SAIDI: this.getSaidiGraphicsData(),
      SAIFI: this.getSaifiGraphicsData(),
      SAIFIAbs: this.getSaifiAbsGraphicsData(),
      SAIDIAbs: this.getSaidiAbsGraphicsData(),
      ENS: this.getEnsGraphicData(),
      Tok: this.getTokGraphicData()
    };
  }

  @action private saveCalculatedData() {
    if (
      this.SAIDI !== null &&
      this.SAIFI !== null &&
      this.ENS !== null &&
      this.Tok !== null
    ) {
      this.savedCalculatedData = [
        ...this.savedCalculatedData,
        {
          id: uid(),
          SAIDI: this.SAIDI,
          SAIFI: this.SAIFI,
          reclosersCount: this.reclosersCount,
          ENS: this.ENS,
          Tok: this.Tok
        }
      ].sort((a, b) => a.reclosersCount - b.reclosersCount);
    }
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
    const L = this.calculateL();

    if (!L) {
      return {};
    }

    const defaultSaifiValue = parseFloat((0.01 * W0 * 0.4 * L).toFixed(3));

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
            parseFloat(((defaultSaifiValue / item.SAIFI) * 100).toFixed(3))
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
    const L = this.calculateL();

    if (!L) {
      return {};
    }

    const defaultSaidiValue = parseFloat((0.01 * W0 * 0.4 * L * T).toFixed(3));

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
            parseFloat(((defaultSaidiValue / item.SAIFI) * 100).toFixed(3))
          )
        }
      ]
    };
  }

  private getEnsGraphicData(): Highcharts.Options {
    const L = this.calculateL();
    const defaultTValue = parseFloat((0.01 * W0 * 0.4 * L * T).toFixed(3));
    const sumP = this.data.reduce<number>((acc, item) => {
      return acc + (item.P as number);
    }, 0);
    const defaultT = defaultTValue * sumP * KZT;

    return {
      title: {
        align: "left",
        style: {fontSize: "14px"},
        text: "Сохраненния электроэнергия кВтч/год"
      },
      yAxis: {
        title: {
          text: "Сохраненная электроэнергия кВтч/год"
        }
      },
      xAxis: {
        categories: this.savedCalculatedData
          .filter((item) => item.reclosersCount)
          .map((item) => item.reclosersCount.toString()),
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
          name: "Сохраненная электроэнергия кВтч/год",
          type: "line",
          data: this.savedCalculatedData
            .filter((item) => item.reclosersCount)
            .map((item) => parseFloat((defaultT - item.ENS).toFixed(3)))
        }
      ]
    };
  }

  private getTokGraphicData(): Highcharts.Options {
    return {
      title: {
        align: "left",
        style: {fontSize: "14px"},
        text: "Срок окупаемости"
      },
      yAxis: {
        title: {
          text: "Срок окупаемости, лет"
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
          name: "Срок окупаемости",
          type: "line",
          data: this.savedCalculatedData.map((item) => item.Tok)
        }
      ]
    };
  }

  private calculateSAIFI() {
    const value =
      this.data.reduce<number>((acc, i) => {
        return acc + (i.W as number) * (i.N as number);
      }, 0) / Nt;

    return parseFloat(value.toFixed(3));
  }

  private calculateSAIDI() {
    const value = this.data.reduce<number>((acc, i) => {
      return acc + ((i.T as number) * (i.N as number)) / Nt;
    }, 0);

    return parseFloat(value.toFixed(3));
  }

  private calculateENS() {
    const value = this.data.reduce<number>((acc, item) => {
      return acc + (item.P as number) * (item.T as number);
    }, 0);

    return parseFloat((value * KZT).toFixed(3));
  }

  private calculateTok() {
    const L = this.calculateL();

    const defaultTValue = parseFloat((0.01 * W0 * 0.4 * L * T).toFixed(3));
    const sumP = this.data.reduce<number>((acc, item) => {
      return acc + (item.P as number);
    }, 0);

    const value =
      (this.reclosersCount * C) /
      ((defaultTValue * sumP * KZT - (this.ENS as number)) * 2 * 74);

    return parseFloat(value.toFixed(3));
  }

  private calculateL() {
    return this.data.reduce<number>((acc, item) => {
      return acc + (item?.L as number) || 0;
    }, 0);
  }

  private findUselessRecloser() {
    const L = this.calculateL();
    const defaultSaifiValue = parseFloat((0.01 * W0 * 0.4 * L).toFixed(3));
    const defaultSaidiValue = parseFloat((0.01 * W0 * 0.4 * L * T).toFixed(3));

    const data = this.savedCalculatedData.filter((item) => item.reclosersCount);
    const uselessIndex = data.findIndex((item, index) => {
      if (!index) {
        return false;
      }

      const prevItem = this.savedCalculatedData[index - 1];

      const saifiAbsCurrent = (defaultSaifiValue / item.SAIFI) * 100;
      const saifiAbsPrev = (defaultSaifiValue / prevItem.SAIFI) * 100;
      const isSaifiUseless = saifiAbsCurrent - saifiAbsPrev < 10;

      const saidiAbsCurrent = (defaultSaidiValue / item.SAIDI) * 100;
      const saidiAbsPrev = (defaultSaidiValue / prevItem.SAIDI) * 100;
      const isSaidiUseless = saidiAbsCurrent - saidiAbsPrev < 10;

      return isSaifiUseless || isSaidiUseless;
    });

    if (uselessIndex > 0) {
      this.notificationStore.addNotification({
        kind: "warn",
        title: "Внимание!",
        message: `Установка ${this.savedCalculatedData[uselessIndex]} реклоузера неэффективна`
      });
    }
  }
}
