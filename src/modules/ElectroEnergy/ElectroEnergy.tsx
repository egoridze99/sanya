import React from "react";
import {useStore} from "src/core/context/useStore";
import {observer} from "mobx-react-lite";

import "./electroEnergy.scss";

const ElectroEnergy = () => {
  const {electroenergy} = useStore();

  return (
    <div className="ElectroEnergy">
      Счетчик: {electroenergy.counter}
      <p onClick={() => electroenergy.increment()}>+</p>
      <p onClick={() => electroenergy.decrement()}>-</p>
    </div>
  );
};

export default observer(ElectroEnergy);
