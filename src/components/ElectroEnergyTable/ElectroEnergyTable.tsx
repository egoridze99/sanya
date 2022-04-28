import React from "react";
import {Button, Table} from "src/core/components";
import {ElectroenergyItem} from "src/store/electroenergy/models/electroenergy.model";
import useColumns from "./hooks/useColumns";

import "./electroEnergyTable.scss";
import classnames from "classnames";

type ElectroEnergyTableProps = {
  data: ElectroenergyItem[];
  calculate(): void;
  saveCalculatedData(): void;
  SAIFI: number | null;
  SAIDI: number | null;
};

const ElectroEnergyTable: React.FC<ElectroEnergyTableProps> = ({
  data,
  calculate,
  saveCalculatedData,
  SAIFI,
  SAIDI
}) => {
  const columns = useColumns();
  const defaultColumnsVisible = React.useMemo(() => {
    return columns.map((column) => column.key);
  }, [columns]);

  const footerRender = React.useCallback(() => {
    return (
      <div
        className={classnames("ElectroEnergyTable__footer", {
          "ElectroEnergyTable__footer_space-between": !!SAIFI
        })}
      >
        <div className="ElectroEnergyTable__footer-left">
          {SAIFI && (
            <p className="ElectroEnergyTable__footer-value">
              Рассчитанное значение SAIFI:{" "}
              <span className={"ElectroEnergyTable__footer-value_bold"}>
                {SAIFI}
              </span>
            </p>
          )}
          {SAIDI && (
            <p className="ElectroEnergyTable__footer-value">
              Рассчитанное значение SAIDI:{" "}
              <span className={"ElectroEnergyTable__footer-value_bold"}>
                {SAIDI}
              </span>
            </p>
          )}
          {SAIFI && SAIDI && (
            <Button
              content={"Сохранить рассчитанные значения"}
              onClick={saveCalculatedData}
              size={"small"}
            />
          )}
        </div>
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
