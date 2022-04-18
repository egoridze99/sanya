import {store} from "../../store";
import React, {useContext} from "react";

export const StoreContext = React.createContext(store);

export const useStore = (): typeof store => useContext(StoreContext);