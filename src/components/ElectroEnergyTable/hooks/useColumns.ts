import React from "react";
import getColumns from "../columnKit";

export default () => {
  return React.useMemo(() => {
    return getColumns();
  }, []);
};
