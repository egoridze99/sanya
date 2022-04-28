import React from "react";
import {Table} from "../../core/components";
import getColumns from "./columnKit";

import "./electroenergySavedDataTable.scss";
import classnames from "classnames";

type ElectroenergySavedDataTableProps = {
  data: {
    id: string;
    SAIDI: number;
    SAIFI: number;
    reclosersCount: number;
  }[];
  removeItem: (id: string) => void;
};

const ElectroenergySavedDataTable: React.FC<
  ElectroenergySavedDataTableProps
> = ({data, removeItem}) => {
  const columns = getColumns(removeItem);
  const defaultColumnsVisible = columns.map((i) => i.key);

  return (
    <div
      className={classnames("ElectroenergySavedDataTable", [
        data.length && "ElectroenergySavedDataTable_expanded"
      ])}
    >
      <p className="ElectroenergySavedDataTable__title">
        Рассчитанные значения
      </p>
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
      />
    </div>
  );
};

export default ElectroenergySavedDataTable;
