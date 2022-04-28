import React from "react";
import {Button, Column} from "src/core/components";

export default (
  removeItem: (id: string) => void
): Column<{
  id: string;
  SAIDI: number;
  SAIFI: number;
  reclosersCount: number;
}>[] => {
  return [
    {
      key: "reclosersCount",
      dataKey: "reclosersCount",
      width: "200px",
      title: "Кол-во реклоузеров"
    },
    {key: "SAIFI", dataKey: "SAIFI", width: "100px", title: "SAIFI"},
    {key: "SAIDI", dataKey: "SAIDI", width: "100px", title: "SAIDI"},
    {
      key: "id",
      dataKey: "id",
      width: "100px",
      title: "",
      render: (key, data) => (
        <div style={{display: "flex", justifyContent: "center"}}>
          <Button
            content={"Удалить"}
            onClick={() => removeItem(data[key])}
            size="small"
          />
        </div>
      )
    }
  ];
};
