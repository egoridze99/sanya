import React from "react";
import {useStore} from "src/core/context/useStore";
import {observer} from "mobx-react-lite";
import ElectroEnergyItemsCountController from "src/components/ElectroEnergyItemsCountController";
import ElectroEnergyTable from "../../components/ElectroEnergyTable";

import "./electroEnergy.scss";
import ElectroenergySavedDataTable from "../../components/ElectroenergySavedDataTable";

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
      <div className="ElectroEnergy__tables">
        <ElectroEnergyTable
          data={electroenergy.data}
          calculate={() => electroenergy.calculate()}
          saveCalculatedData={() => electroenergy.saveCalculatedData()}
          SAIFI={electroenergy.SAIFI}
          SAIDI={electroenergy.SAIDI}
        />
        <ElectroenergySavedDataTable
          data={electroenergy.savedCalculatedData}
          removeItem={(id) => electroenergy.removeCalculatedDataItem(id)}
        />
      </div>
    </div>
  );
};

export default observer(ElectroEnergy);
