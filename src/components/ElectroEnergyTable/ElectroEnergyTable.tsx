import React from "react";
import {Button, Table} from "src/core/components";
import {ElectroenergyItem} from "src/store/electroenergy/models/electroenergy.model";
import useColumns from "./hooks/useColumns";

import "./electroEnergyTable.scss";

type ElectroEnergyTableProps = {
  data: ElectroenergyItem[];
  calculate(): void;
};

const ElectroEnergyTable: React.FC<ElectroEnergyTableProps> = ({
  data,
  calculate
}) => {
  const columns = useColumns();
  const defaultColumnsVisible = React.useMemo(() => {
    return columns.map((column) => column.key);
  }, [columns]);

  const footerRender = React.useCallback(() => {
    return (
      <div className={"ElectroEnergyTable__footer"}>
        <Button content={"Расчитать"} onClick={calculate} size="small" />
      </div>
    );
  }, [calculate]);

  return (
    <div className="ElectroEnergyTable">
      <Table
        columns={columns}
        defaultColumnsVisible={defaultColumnsVisible}
        data={data}
        uqKey="id"
        rowsHeight={36}
        selectable={false}
        paginationPosition="bottom"
        smallHeader
        defaultItemsOnPage={5}
        multiline={false}
        pagination
        selectColumnsVisible={false}
        footerRender={data.length ? footerRender : undefined}
      />
    </div>
  );
};

export default ElectroEnergyTable;
