import { createContext } from "react";
import { Instrument, OrderBookL2_25 } from "../interfaces/appInterfaces";

interface ContextProps {
  instruments: Instrument[];
  orderBookL2_25: OrderBookL2_25[];
}

export const AppContext = createContext({} as ContextProps);
