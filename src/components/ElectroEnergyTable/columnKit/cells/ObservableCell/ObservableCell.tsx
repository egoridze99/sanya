import React from "react";
import {observer} from "mobx-react-lite";
import {ElectroenergyItem} from "src/store/electroenergy/models/electroenergy.model";

import "./observableCell.scss";

type ObservableCellProps = {
  item: ElectroenergyItem;
  field: string;
};

const ObservableCell: React.FC<ObservableCellProps> = ({field, item}) => {
  return <div className="ObservableCell">{item[field]}</div>;
};

export default observer(ObservableCell);
