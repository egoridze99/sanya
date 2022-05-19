import React from "react";
import {Column} from "src/core/components";
import {ElectroenergyItem} from "src/store/electroenergy/models/electroenergy.model";
import InputCell from "./cells/InputCell/InputCell";
import ObservableCell from "./cells/ObservableCell/ObservableCell";

export default (): Column<ElectroenergyItem>[] => {
  return [
    {
      key: "L",
      dataKey: "L",
      title: "L, км",
      width: "100px",
      render: (key, data) => (
        <InputCell item={data} field={key} onChange={(v) => data.setL(v)} />
      )
    },
    {
      key: "N",
      dataKey: "N",
      title: "N, шт",
      width: "100px",
      render: (key, data) => (
        <InputCell item={data} field={key} onChange={(v) => data.setN(v)} />
      )
    },
    {
      key: "W",
      dataKey: "W",
      title: "ω, откл/год",
      width: "140px",
      render: (key, data) => <ObservableCell item={data} field={key} />
    },
    {
      key: "T",
      dataKey: "T",
      title: "T, ч/год",
      width: "110px",
      render: (key, data) => <ObservableCell item={data} field={key} />
    }
  ];
};
