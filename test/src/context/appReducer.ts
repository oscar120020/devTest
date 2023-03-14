import {
  Instrument,
  OrderBookL2_25,
} from "../interfaces/appInterfaces";
import { SocketState } from "./AppProvider";

type actionType =
  | { type: "add-instrument"; payload: Instrument[] }
  | { type: "update-instrument"; payload: Instrument[] }
  | { type: "delete-instrument"; payload: Instrument[] }
  | { type: "add-orderBook"; payload: OrderBookL2_25[] }
  | { type: "update-orderBook"; payload: OrderBookL2_25[] }
  | { type: "delete-orderBook"; payload: OrderBookL2_25[] };

export const appReducer = (
  state: SocketState,
  action: actionType
): SocketState => {
  switch (action.type) {
    case "add-instrument":
      return {
        ...state,
        instruments: [...action.payload],
      };

    case "add-orderBook":
      return {
        ...state,
        orderBookL2_25: [...state.orderBookL2_25, ...action.payload],
      };

    case "update-instrument":
      const newInstrumentUpdated = [...state.instruments];
      for (let instrument of action.payload) {
        const instrumentToUpdate = newInstrumentUpdated.findIndex(
          (e) => e.symbol === instrument.symbol
        );
        newInstrumentUpdated[instrumentToUpdate] = {
          ...newInstrumentUpdated[instrumentToUpdate],
          ...instrument,
        };
      }
      return {
        ...state,
        instruments: newInstrumentUpdated,
      };

    case "update-orderBook":
      const newOrderBookUpdated = [...state.orderBookL2_25];
      for (let order of action.payload) {
        const orderToUpdate = newOrderBookUpdated.findIndex(
          (e) => e.id === order.id
        );
        newOrderBookUpdated[orderToUpdate] = {
          ...newOrderBookUpdated[orderToUpdate],
          ...order,
        };
      }
      return {
        ...state,
        orderBookL2_25: newOrderBookUpdated,
      };

    case "delete-orderBook":
      let newOrderBookDeleted = [...state.orderBookL2_25];
      for (let order of action.payload) {
        newOrderBookDeleted = newOrderBookDeleted.filter(
          (e) => e.id !== order.id
        );
      }
      return {
        ...state,
        orderBookL2_25: newOrderBookDeleted,
      };

    default:
      return state;
  }
};
