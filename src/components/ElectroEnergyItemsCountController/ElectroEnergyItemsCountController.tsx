import React from "react";
import {Button} from "../../core/components";
import {faMinusCircle, faPlusCircle} from "@fortawesome/free-solid-svg-icons";

import "./electroEnergyItemsCountController.scss";

type ElectroEnergyItemsCountControllerProps = {
  reclousersCount: number;
  addReclouser(): void;
  removeReclouser(): void;
};

const ElectroEnergyItemsCountController: React.FC<
  ElectroEnergyItemsCountControllerProps
> = ({reclousersCount, removeReclouser, addReclouser}) => {
  return (
    <div className="ElectroEnergyItemsCountController">
      <p className="ElectroEnergyItemsCountController__label">
        Количество реклоузеров:
      </p>
      <Button
        buttonType={"icon"}
        icon={faMinusCircle}
        onClick={removeReclouser}
      />
      <p className="ElectroEnergyItemsCountController__label ElectroEnergyItemsCountController__label_bold">
        {reclousersCount}
      </p>
      <Button buttonType={"icon"} icon={faPlusCircle} onClick={addReclouser} />
    </div>
  );
};

export default ElectroEnergyItemsCountController;
