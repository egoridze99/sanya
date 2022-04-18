import React from "react";
import {useStore} from "src/core/context/useStore";
import {observer} from "mobx-react-lite";
import ElectroEnergyItemsCountController from "src/components/ElectroEnergyItemsCountController";
import ElectroEnergyTable from "../../components/ElectroEnergyTable";

import "./electroEnergy.scss";

const ElectroEnergy = () => {
  const {electroenergy} = useStore();

  React.useEffect(() => {
    console.log(electroenergy.data);
  }, [electroenergy.data]);

  return (
    <div className="ElectroEnergy">
      <ElectroEnergyItemsCountController
        reclousersCount={electroenergy.reclosersCount}
        removeReclouser={() => electroenergy.removeReclouser()}
        addReclouser={() => electroenergy.addReclouser()}
      />
      <ElectroEnergyTable
        data={electroenergy.data}
        calculate={() => electroenergy.calculate()}
      />
    </div>
  );
};

export default observer(ElectroEnergy);
