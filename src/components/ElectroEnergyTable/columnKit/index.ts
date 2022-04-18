import {Column} from "src/core/components";
import {ElectroenergyItem} from "src/store/electroenergy/models/electroenergy.model";

export default (): Column<ElectroenergyItem>[] => {
  return [
    {
      key: "id",
      dataKey: "id",
      title: "id",
      width: "100px"
    }
  ];
};
